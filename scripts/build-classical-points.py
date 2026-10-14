#!/usr/bin/env python3
"""Shorten classical point locations and fill any missing numbers.

Locations follow the WHO standard point set and A Manual of Acupuncture,
worded as landmark + cun. Existing records keep every field except location.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POINT_FILES = [
    ROOT / "src/data/points-upper.ts",
    ROOT / "src/data/points-lower.ts",
    ROOT / "src/data/points-rest.ts",
]
OUT = ROOT / "src/data/points-fill.ts"

# name, hanzi, english
NAMES: dict[str, tuple[str, str, str]] = {}


def add(channel: str, rows: list[tuple[int, str, str, str]]) -> None:
    for number, pinyin, hanzi, english in rows:
        NAMES[f"{channel}{number}"] = (pinyin, hanzi, english)


add("lu", [
    (1, "Zhongfu", "中府", "Central Treasury"), (2, "Yunmen", "云门", "Cloud Gate"),
    (3, "Tianfu", "天府", "Palace of Heaven"), (4, "Xiabai", "侠白", "Clasping White"),
    (5, "Chize", "尺泽", "Cubit Marsh"), (6, "Kongzui", "孔最", "Maximum Opening"),
    (7, "Lieque", "列缺", "Broken Sequence"), (8, "Jingqu", "经渠", "Channel Gutter"),
    (9, "Taiyuan", "太渊", "Supreme Abyss"), (10, "Yuji", "鱼际", "Fish Border"),
    (11, "Shaoshang", "少商", "Lesser Shang"),
])
add("li", [
    (1, "Shangyang", "商阳", "Shang Yang"), (2, "Erjian", "二间", "Second Space"),
    (3, "Sanjian", "三间", "Third Space"), (4, "Hegu", "合谷", "Joining Valley"),
    (5, "Yangxi", "阳溪", "Yang Stream"), (6, "Pianli", "偏历", "Veering Passage"),
    (7, "Wenliu", "温溜", "Warm Flow"), (8, "Xialian", "下廉", "Lower Angle"),
    (9, "Shanglian", "上廉", "Upper Angle"), (10, "Shousanli", "手三里", "Arm Three Miles"),
    (11, "Quchi", "曲池", "Pool at the Crook"), (12, "Zhouliao", "肘髎", "Elbow Crevice"),
    (13, "Shouwuli", "手五里", "Arm Five Miles"), (14, "Binao", "臂臑", "Upper Arm"),
    (15, "Jianyu", "肩髃", "Shoulder Bone"), (16, "Jugu", "巨骨", "Great Bone"),
    (17, "Tianding", "天鼎", "Heaven's Tripod"), (18, "Futu", "扶突", "Support the Prominence"),
    (19, "Kouheliao", "口禾髎", "Mouth Grain Crevice"), (20, "Yingxiang", "迎香", "Welcome Fragrance"),
])
add("st", [
    (1, "Chengqi", "承泣", "Container of Tears"), (2, "Sibai", "四白", "Four Whites"),
    (3, "Juliao", "巨髎", "Great Crevice"), (4, "Dicang", "地仓", "Earth Granary"),
    (5, "Daying", "大迎", "Great Welcome"), (6, "Jiache", "颊车", "Jaw Bone"),
    (7, "Xiaguan", "下关", "Below the Joint"), (8, "Touwei", "头维", "Head's Binding"),
    (9, "Renying", "人迎", "Man's Welcome"), (10, "Shuitu", "水突", "Water Prominence"),
    (11, "Qishe", "气舍", "Abode of Qi"), (12, "Quepen", "缺盆", "Empty Basin"),
    (13, "Qihu", "气户", "Qi Door"), (14, "Kufang", "库房", "Storehouse"),
    (15, "Wuyi", "屋翳", "Room Screen"), (16, "Yingchuang", "膺窗", "Breast Window"),
    (17, "Ruzhong", "乳中", "Middle of the Breast"), (18, "Rugen", "乳根", "Root of the Breast"),
    (19, "Burong", "不容", "Not Contained"), (20, "Chengman", "承满", "Supporting Fullness"),
    (21, "Liangmen", "梁门", "Beam Gate"), (22, "Guanmen", "关门", "Pass Gate"),
    (23, "Taiyi", "太乙", "Supreme Unity"), (24, "Huaroumen", "滑肉门", "Slippery Flesh Gate"),
    (25, "Tianshu", "天枢", "Heaven's Pivot"), (26, "Wailing", "外陵", "Outer Mound"),
    (27, "Daju", "大巨", "Great Gigantic"), (28, "Shuidao", "水道", "Water Passage"),
    (29, "Guilai", "归来", "Return"), (30, "Qichong", "气冲", "Rushing Qi"),
    (31, "Biguan", "髀关", "Thigh Gate"), (32, "Futu", "伏兔", "Crouching Rabbit"),
    (33, "Yinshi", "阴市", "Yin Market"), (34, "Liangqiu", "梁丘", "Ridge Mound"),
    (35, "Dubi", "犊鼻", "Calf's Nose"), (36, "Zusanli", "足三里", "Leg Three Miles"),
    (37, "Shangjuxu", "上巨虚", "Upper Great Void"), (38, "Tiaokou", "条口", "Lines Opening"),
    (39, "Xiajuxu", "下巨虚", "Lower Great Void"), (40, "Fenglong", "丰隆", "Abundant Bulge"),
    (41, "Jiexi", "解溪", "Stream Divide"), (42, "Chongyang", "冲阳", "Rushing Yang"),
    (43, "Xiangu", "陷谷", "Sunken Valley"), (44, "Neiting", "内庭", "Inner Court"),
    (45, "Lidui", "厉兑", "Strict Exchange"),
])
add("sp", [
    (1, "Yinbai", "隐白", "Hidden White"), (2, "Dadu", "大都", "Great Metropolis"),
    (3, "Taibai", "太白", "Supreme White"), (4, "Gongsun", "公孙", "Grandfather Grandson"),
    (5, "Shangqiu", "商丘", "Shang Mound"), (6, "Sanyinjiao", "三阴交", "Three Yin Intersection"),
    (7, "Lougu", "漏谷", "Dripping Valley"), (8, "Diji", "地机", "Earth Pivot"),
    (9, "Yinlingquan", "阴陵泉", "Yin Mound Spring"), (10, "Xuehai", "血海", "Sea of Blood"),
    (11, "Jimen", "箕门", "Winnowing Gate"), (12, "Chongmen", "冲门", "Rushing Gate"),
    (13, "Fushe", "府舍", "Abode of the Fu"), (14, "Fujie", "腹结", "Abdomen Knot"),
    (15, "Daheng", "大横", "Great Horizontal"), (16, "Fuai", "腹哀", "Abdomen Sorrow"),
    (17, "Shidou", "食窦", "Food Cavity"), (18, "Tianxi", "天溪", "Heavenly Stream"),
    (19, "Xiongxiang", "胸乡", "Chest Village"), (20, "Zhourong", "周荣", "Encircling Glory"),
    (21, "Dabao", "大包", "Great Wrapping"),
])
add("ht", [
    (1, "Jiquan", "极泉", "Supreme Spring"), (2, "Qingling", "青灵", "Green Spirit"),
    (3, "Shaohai", "少海", "Lesser Sea"), (4, "Lingdao", "灵道", "Spirit Path"),
    (5, "Tongli", "通里", "Penetrating the Interior"), (6, "Yinxi", "阴郄", "Yin Cleft"),
    (7, "Shenmen", "神门", "Spirit Gate"), (8, "Shaofu", "少府", "Lesser Palace"),
    (9, "Shaochong", "少冲", "Lesser Rushing"),
])
add("si", [
    (1, "Shaoze", "少泽", "Lesser Marsh"), (2, "Qiangu", "前谷", "Front Valley"),
    (3, "Houxi", "后溪", "Back Stream"), (4, "Wangu", "腕骨", "Wrist Bone"),
    (5, "Yanggu", "阳谷", "Yang Valley"), (6, "Yanglao", "养老", "Support the Aged"),
    (7, "Zhizheng", "支正", "Branch of the Upright"), (8, "Xiaohai", "小海", "Small Sea"),
    (9, "Jianzhen", "肩贞", "True Shoulder"), (10, "Naoshu", "臑俞", "Upper Arm Shu"),
    (11, "Tianzong", "天宗", "Heavenly Gathering"), (12, "Bingfeng", "秉风", "Grasping the Wind"),
    (13, "Quyuan", "曲垣", "Crooked Wall"), (14, "Jianwaishu", "肩外俞", "Outer Shoulder Shu"),
    (15, "Jianzhongshu", "肩中俞", "Middle Shoulder Shu"), (16, "Tianchuang", "天窗", "Heavenly Window"),
    (17, "Tianrong", "天容", "Heavenly Appearance"), (18, "Quanliao", "颧髎", "Cheek Bone Crevice"),
    (19, "Tinggong", "听宫", "Palace of Hearing"),
])
add("bl", [
    (1, "Jingming", "睛明", "Bright Eyes"), (2, "Zanzhu", "攒竹", "Gathered Bamboo"),
    (3, "Meichong", "眉冲", "Eyebrows Pouring"), (4, "Quchai", "曲差", "Crooked Curve"),
    (5, "Wuchu", "五处", "Fifth Place"), (6, "Chengguang", "承光", "Receiving Light"),
    (7, "Tongtian", "通天", "Heavenly Connection"), (8, "Luoque", "络却", "Declining Connection"),
    (9, "Yuzhen", "玉枕", "Jade Pillow"), (10, "Tianzhu", "天柱", "Celestial Pillar"),
    (11, "Dazhu", "大杼", "Great Shuttle"), (12, "Fengmen", "风门", "Wind Gate"),
    (13, "Feishu", "肺俞", "Lung Shu"), (14, "Jueyinshu", "厥阴俞", "Jueyin Shu"),
    (15, "Xinshu", "心俞", "Heart Shu"), (16, "Dushu", "督俞", "Du Shu"),
    (17, "Geshu", "膈俞", "Diaphragm Shu"), (18, "Ganshu", "肝俞", "Liver Shu"),
    (19, "Danshu", "胆俞", "Gallbladder Shu"), (20, "Pishu", "脾俞", "Spleen Shu"),
    (21, "Weishu", "胃俞", "Stomach Shu"), (22, "Sanjiaoshu", "三焦俞", "Sanjiao Shu"),
    (23, "Shenshu", "肾俞", "Kidney Shu"), (24, "Qihaishu", "气海俞", "Sea of Qi Shu"),
    (25, "Dachangshu", "大肠俞", "Large Intestine Shu"), (26, "Guanyuanshu", "关元俞", "Gate of Origin Shu"),
    (27, "Xiaochangshu", "小肠俞", "Small Intestine Shu"), (28, "Pangguangshu", "膀胱俞", "Bladder Shu"),
    (29, "Zhonglushu", "中膂俞", "Mid-Spine Shu"), (30, "Baihuanshu", "白环俞", "White Ring Shu"),
    (31, "Shangliao", "上髎", "Upper Crevice"), (32, "Ciliao", "次髎", "Second Crevice"),
    (33, "Zhongliao", "中髎", "Middle Crevice"), (34, "Xialiao", "下髎", "Lower Crevice"),
    (35, "Huiyang", "会阳", "Meeting of Yang"), (36, "Chengfu", "承扶", "Hold and Support"),
    (37, "Yinmen", "殷门", "Gate of Abundance"), (38, "Fuxi", "浮郄", "Floating Cleft"),
    (39, "Weiyang", "委阳", "Outside of the Crook"), (40, "Weizhong", "委中", "Middle of the Crook"),
    (41, "Fufen", "附分", "Attached Branch"), (42, "Pohu", "魄户", "Door of the Corporeal Soul"),
    (43, "Gaohuangshu", "膏肓俞", "Vital Region Shu"), (44, "Shentang", "神堂", "Spirit Hall"),
    (45, "Yixi", "譩譆", "Yi Xi"), (46, "Geguan", "膈关", "Diaphragm Gate"),
    (47, "Hunmen", "魂门", "Gate of the Ethereal Soul"), (48, "Yanggang", "阳纲", "Yang's Key Link"),
    (49, "Yishe", "意舍", "Abode of Thought"), (50, "Weicang", "胃仓", "Stomach Granary"),
    (51, "Huangmen", "肓门", "Vitals Gate"), (52, "Zhishi", "志室", "Residence of the Will"),
    (53, "Baohuang", "胞肓", "Bladder's Vitals"), (54, "Zhibian", "秩边", "Order's Limit"),
    (55, "Heyang", "合阳", "Confluence of Yang"), (56, "Chengjin", "承筋", "Support the Sinews"),
    (57, "Chengshan", "承山", "Support the Mountain"), (58, "Feiyang", "飞扬", "Taking Flight"),
    (59, "Fuyang", "跗阳", "Instep Yang"), (60, "Kunlun", "昆仑", "Kunlun Mountains"),
    (61, "Pucan", "仆参", "Servant's Respect"), (62, "Shenmai", "申脉", "Extending Vessel"),
    (63, "Jinmen", "金门", "Golden Gate"), (64, "Jinggu", "京骨", "Capital Bone"),
    (65, "Shugu", "束骨", "Restraining Bone"), (66, "Zutonggu", "足通谷", "Foot Connecting Valley"),
    (67, "Zhiyin", "至阴", "Reaching Yin"),
])
add("ki", [
    (1, "Yongquan", "涌泉", "Gushing Spring"), (2, "Rangu", "然谷", "Blazing Valley"),
    (3, "Taixi", "太溪", "Great Ravine"), (4, "Dazhong", "大钟", "Great Bell"),
    (5, "Shuiquan", "水泉", "Water Spring"), (6, "Zhaohai", "照海", "Shining Sea"),
    (7, "Fuliu", "复溜", "Returning Current"), (8, "Jiaoxin", "交信", "Exchange Belief"),
    (9, "Zhubin", "筑宾", "Guest House"), (10, "Yingu", "阴谷", "Yin Valley"),
    (11, "Henggu", "横骨", "Pubic Bone"), (12, "Dahe", "大赫", "Great Luminance"),
    (13, "Qixue", "气穴", "Qi Cave"), (14, "Siman", "四满", "Four Fullnesses"),
    (15, "Zhongzhu", "中注", "Middle Flow"), (16, "Huangshu", "肓俞", "Vitals Shu"),
    (17, "Shangqu", "商曲", "Shang Bend"), (18, "Shiguan", "石关", "Stone Pass"),
    (19, "Yindu", "阴都", "Yin Metropolis"), (20, "Futonggu", "腹通谷", "Abdomen Connecting Valley"),
    (21, "Youmen", "幽门", "Hidden Gate"), (22, "Bulang", "步廊", "Walking Corridor"),
    (23, "Shenfeng", "神封", "Spirit Seal"), (24, "Lingxu", "灵墟", "Spirit Ruin"),
    (25, "Shencang", "神藏", "Spirit Storehouse"), (26, "Yuzhong", "彧中", "Lively Centre"),
    (27, "Shufu", "俞府", "Shu Mansion"),
])
add("pc", [
    (1, "Tianchi", "天池", "Heavenly Pool"), (2, "Tianquan", "天泉", "Heavenly Spring"),
    (3, "Quze", "曲泽", "Marsh at the Crook"), (4, "Ximen", "郄门", "Xi-Cleft Gate"),
    (5, "Jianshi", "间使", "Intermediate Messenger"), (6, "Neiguan", "内关", "Inner Pass"),
    (7, "Daling", "大陵", "Great Mound"), (8, "Laogong", "劳宫", "Palace of Toil"),
    (9, "Zhongchong", "中冲", "Middle Rushing"),
])
add("sj", [
    (1, "Guanchong", "关冲", "Rushing Pass"), (2, "Yemen", "液门", "Fluid Gate"),
    (3, "Zhongzhu", "中渚", "Central Islet"), (4, "Yangchi", "阳池", "Yang Pool"),
    (5, "Waiguan", "外关", "Outer Pass"), (6, "Zhigou", "支沟", "Branch Ditch"),
    (7, "Huizong", "会宗", "Ancestral Meeting"), (8, "Sanyangluo", "三阳络", "Three Yang Connection"),
    (9, "Sidu", "四渎", "Four Rivers"), (10, "Tianjing", "天井", "Heavenly Well"),
    (11, "Qinglengyuan", "清冷渊", "Clear Cold Abyss"), (12, "Xiaoluo", "消泺", "Dispersing Luo River"),
    (13, "Naohui", "臑会", "Upper Arm Meeting"), (14, "Jianliao", "肩髎", "Shoulder Crevice"),
    (15, "Tianliao", "天髎", "Heavenly Crevice"), (16, "Tianyou", "天牖", "Window of Heaven"),
    (17, "Yifeng", "翳风", "Wind Screen"), (18, "Qimai", "瘛脉", "Spasm Vessel"),
    (19, "Luxi", "颅息", "Skull's Rest"), (20, "Jiaosun", "角孙", "Minute Angle"),
    (21, "Ermen", "耳门", "Ear Gate"), (22, "Erheliao", "耳和髎", "Ear Harmony Crevice"),
    (23, "Sizhukong", "丝竹空", "Silken Bamboo Hollow"),
])
add("gb", [
    (1, "Tongziliao", "瞳子髎", "Pupil Crevice"), (2, "Tinghui", "听会", "Meeting of Hearing"),
    (3, "Shangguan", "上关", "Above the Joint"), (4, "Hanyan", "颔厌", "Jaw Serenity"),
    (5, "Xuanlu", "悬颅", "Suspended Skull"), (6, "Xuanli", "悬厘", "Suspended Hair"),
    (7, "Qubin", "曲鬓", "Crook of the Temple"), (8, "Shuaigu", "率谷", "Leading Valley"),
    (9, "Tianchong", "天冲", "Heavenly Rushing"), (10, "Fubai", "浮白", "Floating White"),
    (11, "Touqiaoyin", "头窍阴", "Yin Portals of the Head"), (12, "Wangu", "完骨", "Mastoid Process"),
    (13, "Benshen", "本神", "Root of the Spirit"), (14, "Yangbai", "阳白", "Yang White"),
    (15, "Toulinqi", "头临泣", "Head Governor of Tears"), (16, "Muchuang", "目窗", "Window of the Eye"),
    (17, "Zhengying", "正营", "Upright Nutrition"), (18, "Chengling", "承灵", "Support Spirit"),
    (19, "Naokong", "脑空", "Brain Hollow"), (20, "Fengchi", "风池", "Wind Pool"),
    (21, "Jianjing", "肩井", "Shoulder Well"), (22, "Yuanye", "渊腋", "Armpit Abyss"),
    (23, "Zhejin", "辄筋", "Flank Sinews"), (24, "Riyue", "日月", "Sun and Moon"),
    (25, "Jingmen", "京门", "Capital Gate"), (26, "Daimai", "带脉", "Girdling Vessel"),
    (27, "Wushu", "五枢", "Five Pivots"), (28, "Weidao", "维道", "Linking Path"),
    (29, "Juliao", "居髎", "Stationary Crevice"), (30, "Huantiao", "环跳", "Jumping Circle"),
    (31, "Fengshi", "风市", "Wind Market"), (32, "Zhongdu", "中渎", "Middle Ditch"),
    (33, "Xiyangguan", "膝阳关", "Knee Yang Gate"), (34, "Yanglingquan", "阳陵泉", "Yang Mound Spring"),
    (35, "Yangjiao", "阳交", "Yang Intersection"), (36, "Waiqiu", "外丘", "Outer Hill"),
    (37, "Guangming", "光明", "Bright Light"), (38, "Yangfu", "阳辅", "Yang Assistance"),
    (39, "Xuanzhong", "悬钟", "Suspended Bell"), (40, "Qiuxu", "丘墟", "Mound of Ruins"),
    (41, "Zulinqi", "足临泣", "Foot Governor of Tears"), (42, "Diwuhui", "地五会", "Earth Five Meetings"),
    (43, "Xiaxi", "侠溪", "Clamped Stream"), (44, "Zuqiaoyin", "足窍阴", "Yin Portals of the Foot"),
])
add("lv", [
    (1, "Dadun", "大敦", "Big Mound"), (2, "Xingjian", "行间", "Moving Between"),
    (3, "Taichong", "太冲", "Great Rushing"), (4, "Zhongfeng", "中封", "Middle Seal"),
    (5, "Ligou", "蠡沟", "Woodworm Canal"), (6, "Zhongdu", "中都", "Central Capital"),
    (7, "Xiguan", "膝关", "Knee Joint"), (8, "Ququan", "曲泉", "Spring at the Crook"),
    (9, "Yinbao", "阴包", "Yin Wrapping"), (10, "Zuwuli", "足五里", "Leg Five Miles"),
    (11, "Yinlian", "阴廉", "Yin Corner"), (12, "Jimai", "急脉", "Urgent Pulse"),
    (13, "Zhangmen", "章门", "Completion Gate"), (14, "Qimen", "期门", "Cycle Gate"),
])
add("ren", [
    (1, "Huiyin", "会阴", "Meeting of Yin"), (2, "Qugu", "曲骨", "Curved Bone"),
    (3, "Zhongji", "中极", "Central Pole"), (4, "Guanyuan", "关元", "Origin Pass"),
    (5, "Shimen", "石门", "Stone Gate"), (6, "Qihai", "气海", "Sea of Qi"),
    (7, "Yinjiao", "阴交", "Yin Intersection"), (8, "Shenque", "神阙", "Spirit Gateway"),
    (9, "Shuifen", "水分", "Water Separation"), (10, "Xiawan", "下脘", "Lower Cavity"),
    (11, "Jianli", "建里", "Strengthen the Interior"), (12, "Zhongwan", "中脘", "Middle Cavity"),
    (13, "Shangwan", "上脘", "Upper Cavity"), (14, "Juque", "巨阙", "Great Gateway"),
    (15, "Jiuwei", "鸠尾", "Turtledove Tail"), (16, "Zhongting", "中庭", "Central Courtyard"),
    (17, "Tanzhong", "膻中", "Chest Centre"), (18, "Yutang", "玉堂", "Jade Hall"),
    (19, "Zigong", "紫宫", "Purple Palace"), (20, "Huagai", "华盖", "Florid Canopy"),
    (21, "Xuanji", "璇玑", "Jade Pivot"), (22, "Tiantu", "天突", "Heavenly Prominence"),
    (23, "Lianquan", "廉泉", "Corner Spring"), (24, "Chengjiang", "承浆", "Container of Fluids"),
])
add("du", [
    (1, "Changqiang", "长强", "Long Strong"), (2, "Yaoshu", "腰俞", "Lumbar Shu"),
    (3, "Yaoyangguan", "腰阳关", "Lumbar Yang Gate"), (4, "Mingmen", "命门", "Life Gate"),
    (5, "Xuanshu", "悬枢", "Suspended Pivot"), (6, "Jizhong", "脊中", "Centre of the Spine"),
    (7, "Zhongshu", "中枢", "Central Pivot"), (8, "Jinsuo", "筋缩", "Sinew Contraction"),
    (9, "Zhiyang", "至阳", "Reaching Yang"), (10, "Lingtai", "灵台", "Spirit Tower"),
    (11, "Shendao", "神道", "Spirit Path"), (12, "Shenzhu", "身柱", "Body Pillar"),
    (13, "Taodao", "陶道", "Way of Happiness"), (14, "Dazhui", "大椎", "Great Vertebra"),
    (15, "Yamen", "哑门", "Gate of Muteness"), (16, "Fengfu", "风府", "Wind Palace"),
    (17, "Naohu", "脑户", "Brain's Door"), (18, "Qiangjian", "强间", "Unyielding Space"),
    (19, "Houding", "后顶", "Behind the Crown"), (20, "Baihui", "百会", "Hundred Meetings"),
    (21, "Qianding", "前顶", "In Front of the Crown"), (22, "Xinhui", "囟会", "Fontanelle Meeting"),
    (23, "Shangxing", "上星", "Upper Star"), (24, "Shenting", "神庭", "Spirit Court"),
    (25, "Suliao", "素髎", "White Crevice"), (26, "Shuigou", "水沟", "Water Trough"),
    (27, "Duiduan", "兑端", "Extremity of the Mouth"), (28, "Yinjiao", "龈交", "Gum Intersection"),
])

COUNTS = {
    "lu": 11, "li": 20, "st": 45, "sp": 21, "ht": 9, "si": 19,
    "bl": 67, "ki": 27, "pc": 9, "sj": 23, "gb": 44, "lv": 14, "ren": 24, "du": 28,
}

# Hand-written locations. Patterned channels are filled below if absent.
LOC: dict[str, str] = {
    "lu1": "In the 1st intercostal space, 6 cun lateral to the anterior midline.",
    "lu2": "In the depression below the lateral clavicle, 6 cun lateral to the anterior midline.",
    "lu3": "3 cun inferior to the axillary fold, on the radial side of biceps brachii.",
    "lu4": "4 cun inferior to the axillary fold, 1 cun distal to LU3, radial to biceps brachii.",
    "lu5": "On the cubital crease, in the depression radial to the biceps tendon.",
    "lu6": "On the radial forearm, 7 cun proximal to LU9, on the line joining LU5 and LU9.",
    "lu7": "1.5 cun proximal to the wrist crease, proximal to the styloid process of the radius.",
    "lu8": "1 cun proximal to LU9, on the radial side of the radial artery.",
    "lu9": "At the radial end of the wrist crease, in the depression radial to the radial artery.",
    "lu10": "On the thenar eminence, at the midpoint of the 1st metacarpal.",
    "lu11": "On the radial side of the thumb, 0.1 cun posterior to the nail corner.",
    "li1": "On the radial side of the index finger, 0.1 cun posterior to the nail corner.",
    "li2": "Radial to the index finger, distal to the metacarpophalangeal joint, at the red-white skin junction.",
    "li3": "Radial to the index finger, in the depression proximal to the head of the 2nd metacarpal.",
    "li4": "Radial side of the hand, at the midpoint of the 2nd metacarpal, in the web between thumb and index finger.",
    "li5": "On the radial wrist, in the anatomical snuffbox, between the tendons of extensor pollicis longus and brevis.",
    "li6": "3 cun proximal to LI5, on the line joining LI5 and LI11.",
    "li7": "5 cun proximal to LI5, on the line joining LI5 and LI11.",
    "li8": "4 cun distal to LI11, on the line joining LI5 and LI11.",
    "li9": "3 cun distal to LI11, on the line joining LI5 and LI11.",
    "li10": "2 cun distal to LI11, on the line joining LI5 and LI11.",
    "li11": "At the lateral end of the cubital crease, midway between LU5 and the lateral epicondyle, elbow flexed.",
    "li12": "1 cun proximal to LI11, on the lateral border of the humerus, elbow flexed.",
    "li13": "3 cun proximal to LI11, on the line joining LI11 and LI15.",
    "li14": "On the lateral arm, in the depression on the anterior border of the deltoid insertion.",
    "li15": "Anterior and inferior to the acromion, in the shoulder depression. Clearer with the arm abducted.",
    "li16": "In the depression between the lateral clavicle and the spine of the scapula.",
    "li17": "On the posterior border of the sternocleidomastoid, 1 cun inferior to LI18.",
    "li18": "On the lateral neck, between the two heads of the sternocleidomastoid, level with the laryngeal prominence.",
    "li19": "On the upper lip, directly below the lateral border of the ala nasi, level with DU26.",
    "li20": "In the nasolabial groove, at the midpoint of the lateral border of the ala nasi.",
    "st1": "Directly below the pupil, between the eyeball and the infraorbital ridge.",
    "st2": "Directly below the pupil, in the depression at the infraorbital foramen.",
    "st3": "Directly below the pupil, level with the lower border of the ala nasi.",
    "st4": "0.4 cun lateral to the corner of the mouth, directly below the pupil.",
    "st5": "Anterior to the angle of the mandible, on the anterior border of the masseter.",
    "st6": "One finger-breadth anterior and superior to the angle of the mandible, in the masseter.",
    "st7": "Anterior to the ear, in the depression at the lower border of the zygomatic arch.",
    "st8": "0.5 cun within the anterior hairline at the corner of the forehead, 4.5 cun lateral to the midline.",
    "st9": "Level with the laryngeal prominence, on the anterior border of the sternocleidomastoid.",
    "st10": "Midway between ST9 and ST11, on the anterior border of the sternocleidomastoid.",
    "st11": "At the superior border of the sternal end of the clavicle, between the heads of the sternocleidomastoid.",
    "st12": "In the midpoint of the supraclavicular fossa, 4 cun lateral to the anterior midline.",
    "st13": "At the lower border of the midpoint of the clavicle, 4 cun lateral to the anterior midline.",
    "st17": "At the centre of the nipple, in the 4th intercostal space. A landmark, not a needle point.",
    "st25": "2 cun lateral to the centre of the umbilicus.",
    "st31": "Inferior to the anterior superior iliac spine, level with the lower border of the pubic symphysis.",
    "st32": "6 cun proximal to the superior border of the patella, on the line to the anterior superior iliac spine.",
    "st33": "3 cun proximal to the superolateral border of the patella.",
    "st34": "2 cun proximal to the superolateral border of the patella.",
    "st35": "With the knee flexed, in the depression lateral to the patellar ligament.",
    "st36": "3 cun below the lower border of the patella, 1 finger-breadth lateral to the anterior crest of the tibia.",
    "st37": "6 cun below the lower border of the patella, 1 finger-breadth lateral to the anterior crest of the tibia.",
    "st38": "8 cun below the lower border of the patella, 1 finger-breadth lateral to the anterior crest of the tibia.",
    "st39": "9 cun below the lower border of the patella, 1 finger-breadth lateral to the anterior crest of the tibia.",
    "st40": "8 cun below the lower border of the patella, two finger-breadths lateral to the anterior crest of the tibia.",
    "st41": "On the ankle, level with the lateral malleolus, between the tendons of extensor hallucis longus and extensor digitorum longus.",
    "st42": "On the highest point of the dorsum of the foot, between the same tendons, over the dorsalis pedis artery.",
    "st43": "In the depression distal to the junction of the 2nd and 3rd metatarsal bones.",
    "st44": "Proximal to the web margin between the 2nd and 3rd toes.",
    "st45": "On the lateral side of the 2nd toe, 0.1 cun posterior to the nail corner.",
    "sp1": "On the medial side of the big toe, 0.1 cun posterior to the nail corner.",
    "sp2": "On the medial side of the big toe, distal and inferior to the 1st metatarsophalangeal joint.",
    "sp3": "Proximal and inferior to the head of the 1st metatarsal, at the red-white skin junction.",
    "sp4": "In the depression distal and inferior to the base of the 1st metatarsal.",
    "sp5": "In the depression distal and inferior to the medial malleolus, midway to the navicular tuberosity.",
    "sp6": "3 cun superior to the tip of the medial malleolus, on the posterior border of the tibia.",
    "sp7": "6 cun superior to the tip of the medial malleolus, on the posterior border of the tibia.",
    "sp8": "3 cun distal to SP9, on the line joining SP9 and the medial malleolus.",
    "sp9": "In the depression posterior and inferior to the medial condyle of the tibia.",
    "sp10": "2 cun proximal to the mediosuperior border of the patella, on vastus medialis.",
    "sp11": "6 cun proximal to SP10, on the line joining SP10 and SP12.",
    "sp12": "3.5 cun lateral to the anterior midline, superior to the inguinal groove, lateral to the femoral artery.",
    "sp13": "4 cun lateral to the anterior midline, 0.7 cun superior to SP12.",
    "sp14": "1.3 cun inferior to SP15, 4 cun lateral to the anterior midline.",
    "sp15": "4 cun lateral to the centre of the umbilicus, lateral to rectus abdominis.",
    "sp16": "3 cun superior to the umbilicus, 4 cun lateral to the anterior midline.",
    "sp21": "On the mid-axillary line, in the 6th intercostal space.",
    "ht1": "In the centre of the axilla, on the medial side of the axillary artery.",
    "ht2": "3 cun proximal to the medial end of the cubital crease, on the line joining HT1 and HT3.",
    "ht3": "With the elbow flexed, at the medial end of the cubital crease, anterior to the medial epicondyle.",
    "ht4": "1.5 cun proximal to HT7, on the radial side of the flexor carpi ulnaris tendon.",
    "ht5": "1 cun proximal to HT7, on the radial side of the flexor carpi ulnaris tendon.",
    "ht6": "0.5 cun proximal to HT7, on the radial side of the flexor carpi ulnaris tendon.",
    "ht7": "At the ulnar end of the wrist crease, radial to the flexor carpi ulnaris tendon.",
    "ht8": "On the palm, between the 4th and 5th metacarpal bones. The little fingertip rests here in a fist.",
    "ht9": "On the radial side of the little finger, 0.1 cun posterior to the nail corner.",
    "si1": "On the ulnar side of the little finger, 0.1 cun posterior to the nail corner.",
    "si2": "On the ulnar side of the little finger, distal to the 5th metacarpophalangeal joint.",
    "si3": "On the ulnar border of the hand, proximal to the head of the 5th metacarpal, at the end of the palm crease.",
    "si4": "On the ulnar wrist, between the base of the 5th metacarpal and the triquetral bone.",
    "si5": "On the ulnar wrist, in the depression between the ulnar styloid process and the triquetral bone.",
    "si6": "Dorsal to the wrist, in the bony cleft radial to the styloid process of the ulna.",
    "si7": "5 cun proximal to SI5, on the line joining SI5 and SI8.",
    "si8": "Between the olecranon and the medial epicondyle, elbow flexed.",
    "si9": "1 cun superior to the posterior axillary fold, with the arm at the side.",
    "si10": "Directly superior to SI9, in the depression inferior to the scapular spine.",
    "si11": "In the infraspinous fossa, one third of the way from the scapular spine to the inferior angle.",
    "si12": "In the centre of the suprascapular fossa, directly superior to SI11.",
    "si13": "At the medial end of the suprascapular fossa, midway between SI10 and the spinous process of T2.",
    "si14": "3 cun lateral to the lower border of the spinous process of T1.",
    "si15": "2 cun lateral to the lower border of the spinous process of C7.",
    "si16": "On the posterior border of the sternocleidomastoid, posterior to LI18, level with the laryngeal prominence.",
    "si17": "Posterior to the angle of the mandible, in the depression anterior to the sternocleidomastoid.",
    "si18": "Directly below the outer canthus, in the depression on the lower border of the zygomatic bone.",
    "si19": "Anterior to the tragus, in the depression between the tragus and the mandibular condyle. Mouth slightly open.",
    "bl1": "0.1 cun medial and superior to the inner canthus.",
    "bl2": "At the medial end of the eyebrow, in the supraorbital notch.",
    "bl3": "Directly superior to BL2, 0.5 cun within the anterior hairline.",
    "bl4": "0.5 cun within the anterior hairline, 1.5 cun lateral to the midline.",
    "bl5": "1 cun within the anterior hairline, 1.5 cun lateral to the midline.",
    "bl6": "2.5 cun within the anterior hairline, 1.5 cun lateral to the midline.",
    "bl7": "4 cun within the anterior hairline, 1.5 cun lateral to the midline.",
    "bl8": "5.5 cun within the anterior hairline, 1.5 cun lateral to the midline.",
    "bl9": "2.5 cun superior to the posterior hairline, 1.3 cun lateral to the midline.",
    "bl10": "0.5 cun within the posterior hairline, 1.3 cun lateral to the midline, on the lateral border of trapezius.",
    "bl35": "0.5 cun lateral to the midline, level with the tip of the coccyx.",
    "bl36": "In the centre of the transverse gluteal crease.",
    "bl37": "6 cun distal to BL36, on the line joining BL36 and BL40.",
    "bl38": "1 cun superior to BL39, on the medial border of the biceps femoris tendon.",
    "bl39": "At the lateral end of the popliteal crease, on the medial border of the biceps femoris tendon.",
    "bl40": "At the midpoint of the popliteal crease.",
    "bl53": "3 cun lateral to the midline, level with the 2nd sacral foramen.",
    "bl54": "3 cun lateral to the sacral hiatus.",
    "bl55": "2 cun inferior to BL40, between the two heads of gastrocnemius.",
    "bl56": "Midway between BL55 and BL57, in the gastrocnemius.",
    "bl57": "On the posterior midline of the calf, where the two bellies of gastrocnemius join.",
    "bl58": "7 cun proximal to BL60, 1 cun lateral and inferior to BL57.",
    "bl59": "3 cun proximal to BL60, on the line joining BL58 and BL60.",
    "bl60": "Midway between the prominence of the lateral malleolus and the Achilles tendon.",
    "bl61": "Posterior and inferior to the lateral malleolus, directly inferior to BL60.",
    "bl62": "In the depression directly inferior to the lateral malleolus.",
    "bl63": "Anterior and inferior to BL62, in the depression lateral to the cuboid bone.",
    "bl64": "Anterior and inferior to the tuberosity of the 5th metatarsal, at the red-white skin junction.",
    "bl65": "Posterior and inferior to the head of the 5th metatarsal, at the red-white skin junction.",
    "bl66": "Anterior and inferior to the 5th metatarsophalangeal joint, at the red-white skin junction.",
    "bl67": "On the lateral side of the little toe, 0.1 cun posterior to the nail corner.",
    "ki1": "On the sole, in the depression formed when the toes are plantarflexed, in the anterior third of the sole.",
    "ki2": "Anterior and inferior to the medial malleolus, distal to the navicular tuberosity.",
    "ki3": "In the depression between the tip of the medial malleolus and the Achilles tendon.",
    "ki4": "Posterior and inferior to the medial malleolus, anterior to the medial attachment of the Achilles tendon.",
    "ki5": "1 cun inferior to KI3, in the depression anterior and superior to the calcaneal tuberosity.",
    "ki6": "In the depression about 1 cun inferior to the prominence of the medial malleolus.",
    "ki7": "2 cun superior to KI3, on the anterior border of the Achilles tendon.",
    "ki8": "2 cun superior to KI3, 0.5 cun anterior to KI7, posterior to the medial border of the tibia.",
    "ki9": "5 cun superior to KI3, about 1 cun posterior to the medial border of the tibia.",
    "ki10": "At the medial end of the popliteal crease, between the semitendinosus and semimembranosus tendons.",
    "pc1": "1 cun lateral to the nipple, in the 4th intercostal space.",
    "pc2": "2 cun inferior to the anterior axillary fold, between the two heads of biceps brachii.",
    "pc3": "On the cubital crease, on the ulnar side of the biceps tendon.",
    "pc4": "5 cun proximal to the wrist crease, on the line joining PC3 and PC7.",
    "pc5": "3 cun proximal to the wrist crease, between the tendons of palmaris longus and flexor carpi radialis.",
    "pc6": "2 cun proximal to the wrist crease, between the tendons of palmaris longus and flexor carpi radialis.",
    "pc7": "At the midpoint of the wrist crease, between palmaris longus and flexor carpi radialis.",
    "pc8": "On the palm, between the 2nd and 3rd metacarpal bones, where the middle fingertip rests in a fist.",
    "pc9": "In the centre of the tip of the middle finger.",
    "sj1": "On the ulnar side of the ring finger, 0.1 cun posterior to the nail corner.",
    "sj2": "0.5 cun proximal to the web margin between the ring and little fingers.",
    "sj3": "On the dorsum of the hand, in the depression just proximal to the 4th and 5th metacarpophalangeal joints.",
    "sj4": "On the dorsal wrist, in the depression lateral to the extensor digitorum tendon, at the wrist joint.",
    "sj5": "2 cun proximal to the dorsal wrist crease, between the radius and the ulna.",
    "sj6": "3 cun proximal to the dorsal wrist crease, between the radius and the ulna.",
    "sj7": "3 cun proximal to the dorsal wrist crease, on the radial side of the ulna, level with SJ6.",
    "sj8": "4 cun proximal to the dorsal wrist crease, between the radius and the ulna.",
    "sj9": "5 cun distal to the olecranon, between the radius and the ulna.",
    "sj10": "1 cun proximal to the olecranon, with the elbow flexed.",
    "sj11": "1 cun proximal to SJ10, with the elbow flexed.",
    "sj12": "Midway between SJ11 and SJ13, on the line joining the olecranon and SJ14.",
    "sj13": "On the posterior border of the deltoid, on the line joining the olecranon and SJ14.",
    "sj14": "Posterior and inferior to the acromion, in the depression posterior to LI15, arm abducted.",
    "sj15": "Midway between GB21 and SI13, at the superior angle of the scapula.",
    "sj16": "On the posterior border of the sternocleidomastoid, about 1 cun inferior to GB12, level with the mandibular angle.",
    "sj17": "Posterior to the earlobe, in the depression between the mandible and the mastoid process.",
    "sj18": "Posterior to the ear, on the mastoid, one third of the way up the curve from SJ17 to SJ20.",
    "sj19": "Posterior to the ear, two thirds of the way up the curve from SJ17 to SJ20.",
    "sj20": "Directly above the apex of the ear, within the hairline.",
    "sj21": "In the depression anterior to the supratragic notch, at the posterior border of the mandibular condyle. Mouth open.",
    "sj22": "Anterior and superior to SJ21, level with the root of the auricle, at the posterior border of the temple hair.",
    "sj23": "In the depression at the lateral end of the eyebrow.",
    "gb1": "0.5 cun lateral to the outer canthus, in the depression on the lateral side of the orbit.",
    "gb2": "Anterior to the intertragic notch, at the posterior border of the mandibular condyle. Mouth open.",
    "gb3": "Anterior to the ear, on the upper border of the zygomatic arch, directly superior to ST7.",
    "gb4": "Within the temple hairline, one quarter of the way along the curve from ST8 to GB7.",
    "gb5": "Within the hairline, midway along the curve from ST8 to GB7.",
    "gb6": "Within the hairline, three quarters of the way along the curve from ST8 to GB7.",
    "gb7": "Within the hairline, anterior and superior to the auricle, about 1 cun anterior to SJ20.",
    "gb8": "Superior to the apex of the ear, 1.5 cun within the hairline.",
    "gb9": "Above the posterior border of the auricle, 2 cun within the hairline, about 0.5 cun posterior to GB8.",
    "gb10": "Posterior and superior to the mastoid process, 1 cun within the hairline.",
    "gb11": "Posterior to the ear, one third of the way down the curve from GB9 to GB12.",
    "gb12": "In the depression posterior and inferior to the mastoid process.",
    "gb13": "0.5 cun within the anterior hairline, two thirds of the distance from DU24 to ST8.",
    "gb14": "On the forehead, 1 cun superior to the midpoint of the eyebrow.",
    "gb15": "Directly above GB14, 0.5 cun within the anterior hairline, midway between DU24 and ST8.",
    "gb16": "1.5 cun posterior to GB15, on the line joining GB15 and GB20.",
    "gb17": "1.5 cun posterior to GB16, on the line joining GB15 and GB20.",
    "gb18": "1.5 cun posterior to GB17, on the line joining GB15 and GB20.",
    "gb19": "Directly above GB20, level with the upper border of the external occipital prominence.",
    "gb20": "Below the occiput, in the depression between the sternocleidomastoid and trapezius.",
    "gb21": "Midway between DU14 and the acromion, at the highest point of the trapezius.",
    "gb22": "On the mid-axillary line, 3 cun inferior to the axilla, in the 4th intercostal space.",
    "gb23": "1 cun anterior to GB22, in the 4th intercostal space.",
    "gb24": "In the 7th intercostal space, 4 cun lateral to the anterior midline.",
    "gb25": "On the lateral abdomen, at the free end of the 12th rib.",
    "gb26": "Directly inferior to the free end of the 11th rib, level with the umbilicus.",
    "gb27": "In the depression medial and inferior? No.",
    "gb28": "0.5 cun anterior and inferior to GB27.",
    "gb29": "Midway between the anterior superior iliac spine and the prominence of the greater trochanter.",
    "gb30": "At the junction of the lateral one third and medial two thirds of the line from the greater trochanter to the sacral hiatus.",
    "gb31": "On the midline of the lateral thigh, 7 cun superior to the popliteal crease.",
    "gb32": "On the lateral thigh, 5 cun superior to the popliteal crease, between vastus lateralis and biceps femoris.",
    "gb33": "In the depression superior to the lateral epicondyle of the femur, between the femur and the biceps femoris tendon. Knee flexed.",
    "gb34": "In the depression anterior and inferior to the head of the fibula.",
    "gb35": "7 cun superior to the tip of the lateral malleolus, on the posterior border of the fibula.",
    "gb36": "7 cun superior to the tip of the lateral malleolus, on the anterior border of the fibula.",
    "gb37": "5 cun superior to the tip of the lateral malleolus, on the anterior border of the fibula.",
    "gb38": "4 cun superior to the tip of the lateral malleolus, on the anterior border of the fibula.",
    "gb39": "3 cun superior to the tip of the lateral malleolus, on the posterior border of the fibula.",
    "gb40": "Anterior and inferior to the lateral malleolus, in the depression lateral to the extensor digitorum longus tendon.",
    "gb41": "In the depression distal to the junction of the 4th and 5th metatarsal bones, lateral to the extensor tendon.",
    "gb42": "Between the 4th and 5th metatarsal bones, proximal to the metatarsophalangeal joints, medial to the extensor tendon.",
    "gb43": "Between the 4th and 5th toes, proximal to the web margin.",
    "gb44": "On the lateral side of the 4th toe, 0.1 cun posterior to the nail corner.",
    "lv1": "On the lateral side of the big toe, 0.1 cun posterior to the nail corner.",
    "lv2": "Between the 1st and 2nd toes, proximal to the web margin.",
    "lv3": "On the dorsum of the foot, in the depression distal to the junction of the 1st and 2nd metatarsal bones.",
    "lv4": "Anterior to the medial malleolus, midway between SP5 and ST41, medial to the tibialis anterior tendon.",
    "lv5": "5 cun superior to the tip of the medial malleolus, on the medial border of the tibia.",
    "lv6": "7 cun superior to the tip of the medial malleolus, on the medial border of the tibia.",
    "lv7": "Posterior and inferior to the medial condyle of the tibia, 1 cun posterior to SP9.",
    "lv8": "With the knee flexed, in the depression superior to the medial end of the popliteal crease.",
    "lv9": "4 cun superior to the medial epicondyle of the femur, between vastus medialis and sartorius.",
    "lv10": "3 cun inferior to ST30, on the anterior border of adductor longus.",
    "lv11": "2 cun inferior to ST30, on the anterior border of adductor longus.",
    "lv12": "2.5 cun lateral to the anterior midline, inferior and lateral to the pubic tubercle.",
    "lv13": "On the lateral abdomen, at the free end of the 11th rib.",
    "lv14": "In the 6th intercostal space, 4 cun lateral to the anterior midline.",
    "ren1": "On the midline of the perineum, midway between the anus and the external genitals.",
    "ren2": "On the anterior midline, at the superior border of the pubic symphysis.",
    "ren3": "On the anterior midline, 4 cun inferior to the umbilicus.",
    "ren4": "On the anterior midline, 3 cun inferior to the umbilicus.",
    "ren5": "On the anterior midline, 2 cun inferior to the umbilicus.",
    "ren6": "On the anterior midline, 1.5 cun inferior to the umbilicus.",
    "ren7": "On the anterior midline, 1 cun inferior to the umbilicus.",
    "ren8": "In the centre of the umbilicus.",
    "ren9": "On the anterior midline, 1 cun superior to the umbilicus.",
    "ren10": "On the anterior midline, 2 cun superior to the umbilicus.",
    "ren11": "On the anterior midline, 3 cun superior to the umbilicus.",
    "ren12": "On the anterior midline, 4 cun superior to the umbilicus.",
    "ren13": "On the anterior midline, 5 cun superior to the umbilicus.",
    "ren14": "On the anterior midline, 6 cun superior to the umbilicus.",
    "ren15": "On the anterior midline, 1 cun inferior to the xiphoid process, 7 cun superior to the umbilicus.",
    "ren16": "On the midline of the sternum, level with the 5th intercostal space.",
    "ren17": "On the midline of the sternum, level with the 4th intercostal space.",
    "ren18": "On the midline of the sternum, level with the 3rd intercostal space.",
    "ren19": "On the midline of the sternum, level with the 2nd intercostal space.",
    "ren20": "On the midline of the sternum, level with the 1st intercostal space.",
    "ren21": "On the midline of the manubrium, 1 cun inferior to Ren22.",
    "ren22": "On the midline, in the centre of the suprasternal fossa.",
    "ren23": "On the anterior midline of the neck, in the depression superior to the hyoid bone.",
    "ren24": "On the midline, in the centre of the mentolabial groove.",
    "du1": "On the midline, midway between the tip of the coccyx and the anus.",
    "du2": "On the midline, in the sacral hiatus.",
    "du3": "On the midline, below the spinous process of L4.",
    "du4": "On the midline, below the spinous process of L2.",
    "du5": "On the midline, below the spinous process of L1.",
    "du6": "On the midline, below the spinous process of T11.",
    "du7": "On the midline, below the spinous process of T10.",
    "du8": "On the midline, below the spinous process of T9.",
    "du9": "On the midline, below the spinous process of T7.",
    "du10": "On the midline, below the spinous process of T6.",
    "du11": "On the midline, below the spinous process of T5.",
    "du12": "On the midline, below the spinous process of T3.",
    "du13": "On the midline, below the spinous process of T1.",
    "du14": "On the midline, below the spinous process of C7.",
    "du15": "On the midline, 0.5 cun within the posterior hairline, below the spinous process of C1.",
    "du16": "On the midline, in the depression directly below the external occipital prominence.",
    "du17": "On the midline, 1.5 cun superior to DU16.",
    "du18": "On the midline, 1.5 cun superior to DU17, midway between DU16 and DU20.",
    "du19": "On the midline, 1.5 cun posterior to DU20.",
    "du20": "On the midline of the vertex, 5 cun posterior to the anterior hairline.",
    "du21": "On the midline, 1.5 cun anterior to DU20.",
    "du22": "On the midline, 2 cun posterior to the anterior hairline.",
    "du23": "On the midline, 1 cun posterior to the anterior hairline.",
    "du24": "On the midline, 0.5 cun within the anterior hairline.",
    "du25": "On the midline, at the tip of the nose.",
    "du26": "On the midline of the philtrum, one third of the distance from the nose to the upper lip.",
    "du27": "On the midline, at the junction of the upper lip and the philtrum.",
    "du28": "Inside the mouth, at the junction of the upper gum and the frenulum.",
}

# I left a bad placeholder on gb27. Fix it.
LOC["gb27"] = "In the depression just anterior to the anterior superior iliac spine, about 3 cun inferior to the umbilicus."


def lateral_chest(code: str, space: int, cun: int) -> None:
    LOC[code] = f"In the {space}{ordinal(space)} intercostal space, {cun} cun lateral to the anterior midline."


def ordinal(n: int) -> str:
    return {1: "st", 2: "nd", 3: "rd"}.get(n, "th")


for n, space in [(14, 1), (15, 2), (16, 3), (18, 5)]:
    lateral_chest(f"st{n}", space, 4)
for n, above in [(19, 6), (20, 5), (21, 4), (22, 3), (23, 2), (24, 1)]:
    LOC[f"st{n}"] = f"{above} cun superior to the umbilicus, 2 cun lateral to the anterior midline."
for n, below in [(26, 1), (27, 2), (28, 3), (29, 4), (30, 5)]:
    LOC[f"st{n}"] = f"{below} cun inferior to the umbilicus, 2 cun lateral to the anterior midline."
for n, space in [(17, 5), (18, 4), (19, 3), (20, 2)]:
    lateral_chest(f"sp{n}", space, 6)

INNER_BL = {
    11: "T1", 12: "T2", 13: "T3", 14: "T4", 15: "T5", 16: "T6", 17: "T7",
    18: "T9", 19: "T10", 20: "T11", 21: "T12", 22: "L1", 23: "L2", 24: "L3", 25: "L4", 26: "L5",
}
for n, bone in INNER_BL.items():
    LOC[f"bl{n}"] = f"1.5 cun lateral to the midline, level with the lower border of the spinous process of {bone}."
for n, which in [(27, "1st"), (28, "2nd"), (29, "3rd"), (30, "4th")]:
    LOC[f"bl{n}"] = f"1.5 cun lateral to the midline, level with the {which} sacral foramen."
for n, which in [(31, "1st"), (32, "2nd"), (33, "3rd"), (34, "4th")]:
    LOC[f"bl{n}"] = f"In the {which} sacral foramen."
OUTER_BL = {41: "T2", 42: "T3", 43: "T4", 44: "T5", 45: "T6", 46: "T7", 47: "T9", 48: "T10", 49: "T11", 50: "T12", 51: "L1", 52: "L2"}
for n, bone in OUTER_BL.items():
    LOC[f"bl{n}"] = f"3 cun lateral to the midline, level with the lower border of the spinous process of {bone}."

# 0.5 cun lateral, level with the Ren points named in Deadman.
KI_ABD = {
    11: "5 cun inferior to the umbilicus, on the superior border of the pubic symphysis",
    12: "4 cun inferior to the umbilicus",
    13: "3 cun inferior to the umbilicus",
    14: "2 cun inferior to the umbilicus",
    15: "1 cun inferior to the umbilicus",
    16: "level with the centre of the umbilicus",
    17: "2 cun superior to the umbilicus",
    18: "3 cun superior to the umbilicus",
    19: "4 cun superior to the umbilicus",
    20: "5 cun superior to the umbilicus",
    21: "6 cun superior to the umbilicus",
}
for n, where in KI_ABD.items():
    LOC[f"ki{n}"] = f"0.5 cun lateral to the anterior midline, {where}."
for n, space in [(22, 5), (23, 4), (24, 3), (25, 2), (26, 1)]:
    lateral_chest(f"ki{n}", space, 2)
LOC["ki27"] = "In the depression on the lower border of the clavicle, 2 cun lateral to the anterior midline."

FIVE = {
    "lu11": "Jing-well", "lu10": "Ying-spring", "lu9": "Shu-stream", "lu8": "Jing-river", "lu5": "He-sea",
    "li1": "Jing-well", "li2": "Ying-spring", "li3": "Shu-stream", "li5": "Jing-river", "li11": "He-sea",
    "st45": "Jing-well", "st44": "Ying-spring", "st43": "Shu-stream", "st41": "Jing-river", "st36": "He-sea",
    "sp1": "Jing-well", "sp2": "Ying-spring", "sp3": "Shu-stream", "sp5": "Jing-river", "sp9": "He-sea",
    "ht9": "Jing-well", "ht8": "Ying-spring", "ht7": "Shu-stream", "ht4": "Jing-river", "ht3": "He-sea",
    "si1": "Jing-well", "si2": "Ying-spring", "si3": "Shu-stream", "si5": "Jing-river", "si8": "He-sea",
    "bl67": "Jing-well", "bl66": "Ying-spring", "bl65": "Shu-stream", "bl60": "Jing-river", "bl40": "He-sea",
    "ki1": "Jing-well", "ki2": "Ying-spring", "ki3": "Shu-stream", "ki7": "Jing-river", "ki10": "He-sea",
    "pc9": "Jing-well", "pc8": "Ying-spring", "pc7": "Shu-stream", "pc5": "Jing-river", "pc3": "He-sea",
    "sj1": "Jing-well", "sj2": "Ying-spring", "sj3": "Shu-stream", "sj6": "Jing-river", "sj10": "He-sea",
    "gb44": "Jing-well", "gb43": "Ying-spring", "gb41": "Shu-stream", "gb38": "Jing-river", "gb34": "He-sea",
    "lv1": "Jing-well", "lv2": "Ying-spring", "lv3": "Shu-stream", "lv4": "Jing-river", "lv8": "He-sea",
}
SOURCE = {"lu9", "li4", "st42", "sp3", "ht7", "si4", "bl64", "ki3", "pc7", "sj4", "gb40", "lv3"}
LUO = {"lu7", "li6", "st40", "sp4", "ht5", "si7", "bl58", "ki4", "pc6", "sj5", "gb37", "lv5"}
XI = {"lu6", "li7", "st34", "sp8", "ht6", "si6", "bl63", "ki5", "pc4", "sj7", "gb36", "lv6"}
FRONT_MU = {"gb24": "Gallbladder", "gb25": "Kidney"}

REGION = {
    "head-face": set(),
    "neck": set(),
    "chest": set(),
    "abdomen": set(),
    "back": set(),
    "shoulder-arm": set(),
    "hand": set(),
    "hip-leg": set(),
    "foot": set(),
    "ear": set(),
}


def put(region: str, *ids: str) -> None:
    REGION[region].update(ids)


put("chest", *[f"lu{n}" for n in (1, 2)], *[f"st{n}" for n in range(11, 19)], *[f"sp{n}" for n in range(17, 22)],
    "pc1", *[f"ki{n}" for n in range(22, 28)], *[f"ren{n}" for n in range(16, 23)], "gb22", "gb23", "gb24", "lv14")
put("shoulder-arm", *[f"lu{n}" for n in range(3, 7)], *[f"li{n}" for n in range(6, 17)], *[f"ht{n}" for n in (1, 2)],
    *[f"si{n}" for n in range(7, 16)], *[f"pc{n}" for n in (2, 3, 4)], *[f"sj{n}" for n in range(8, 16)], "gb21")
put("hand", *[f"lu{n}" for n in range(7, 12)], *[f"li{n}" for n in range(1, 6)], *[f"ht{n}" for n in range(4, 10)],
    *[f"si{n}" for n in range(1, 7)], *[f"pc{n}" for n in range(5, 10)], *[f"sj{n}" for n in range(1, 8)])
put("head-face", *[f"li{n}" for n in (19, 20)], *[f"st{n}" for n in range(1, 9)], "si18",
    *[f"bl{n}" for n in range(1, 10)], *[f"gb{n}" for n in list(range(1, 20)) if n not in (2,)],
    *[f"du{n}" for n in range(17, 29)], "ren23", "ren24", "sj20", "sj22", "sj23")
put("ear", "si19", "sj17", "sj18", "sj19", "sj21", "gb2")
put("neck", "li17", "li18", "st9", "st10", "si16", "si17", "bl10", "gb20", "sj16", "du14", "du15", "du16")
put("abdomen", *[f"st{n}" for n in range(19, 31)], *[f"sp{n}" for n in range(12, 17)],
    *[f"ki{n}" for n in range(11, 22)], *[f"ren{n}" for n in range(1, 16)],
    "gb25", "gb26", "gb27", "gb28", "lv13", "lv12")
put("back", *[f"bl{n}" for n in range(11, 36)], *[f"bl{n}" for n in range(41, 55)], *[f"du{n}" for n in range(1, 14)], "si14", "si15")
put("hip-leg", *[f"st{n}" for n in range(31, 41)], *[f"sp{n}" for n in range(6, 12)],
    *[f"bl{n}" for n in range(36, 41)], *[f"bl{n}" for n in range(55, 60)],
    *[f"ki{n}" for n in range(7, 11)], *[f"gb{n}" for n in range(29, 40)],
    *[f"lv{n}" for n in range(5, 12)])
put("foot", *[f"st{n}" for n in range(41, 46)], *[f"sp{n}" for n in range(1, 6)],
    *[f"bl{n}" for n in range(60, 68)], *[f"ki{n}" for n in range(1, 7)],
    *[f"gb{n}" for n in range(40, 45)], *[f"lv{n}" for n in range(1, 5)])


def region_of(pid: str) -> str:
    for name, ids in REGION.items():
        if pid in ids:
            return name
    raise SystemExit(f"no region for {pid}")


def words(text: str) -> int:
    return len(re.findall(r"[A-Za-z0-9]+(?:'[A-Za-z]+)?", text))


def existing_ids() -> set[str]:
    found = set()
    for path in POINT_FILES:
        found.update(re.findall(r'id: "([a-z]+\d+)"', path.read_text()))
    return found


def replace_locations(ids: set[str]) -> int:
    changed = 0
    for path in POINT_FILES:
        text = path.read_text()

        def swap(match: re.Match[str]) -> str:
            nonlocal changed
            pid = match.group(1)
            if pid not in LOC:
                return match.group(0)
            changed += 1
            return f'{match.group(1) and ""}id: "{pid}"'  # placeholder, unused

        # Replace the location string that follows each known id, before the next id.
        def repl_block(match: re.Match[str]) -> str:
            nonlocal changed
            pid = match.group(1)
            block = match.group(0)
            if pid not in ids or pid not in LOC:
                return block
            new_block, count = re.subn(
                r'(location: )"(?:[^"\\]|\\.)*"',
                lambda m: m.group(1) + json.dumps(LOC[pid]),
                block,
                count=1,
            )
            if count != 1:
                raise SystemExit(f"could not replace location for {pid}")
            changed += 1
            return new_block

        text2 = re.sub(r'id: "([a-z0-9]+)",[\s\S]*?(?=\n  \{|\n\];)', repl_block, text)
        path.write_text(text2)
    return changed


def kinds_for(pid: str) -> tuple[list[str], list[str]]:
    kinds: list[str] = []
    roles: list[str] = []
    if pid in FIVE:
        kinds.append("five-shu")
        roles.append(FIVE[pid])
    if pid in SOURCE:
        kinds.append("source")
        roles.append("Yuan-source")
    if pid in LUO:
        kinds.append("luo")
        roles.append("Luo-connecting")
    if pid in XI:
        kinds.append("xi-cleft")
        roles.append("Xi-cleft")
    if pid in FRONT_MU:
        kinds.append("front-mu")
        roles.append(f"Front-mu of the {FRONT_MU[pid]}")
    return kinds, roles


def emit(missing: list[str]) -> None:
    lines = [
        'import type { Point } from "./types";',
        "",
        "/** Classical points not in the original sample. Locations are the short WHO-style lines. */",
        "export const FILL_POINTS: Point[] = [",
    ]
    for pid in missing:
        channel = re.match(r"[a-z]+", pid).group(0)
        number = int(pid[len(channel):])
        pinyin, hanzi, english = NAMES[pid]
        code = f"{channel.upper()}{number}" if channel not in ("ren", "du") else f"{channel.capitalize()}{number}"
        if channel == "sj":
            code = f"SJ{number}"
        region = region_of(pid)
        safety = "caution" if region in {"head-face", "neck", "chest", "abdomen", "back", "ear"} or pid in {"bl40", "st9", "lv12"} else "general"
        kinds, roles = kinds_for(pid)
        nearby = {
            "st9": "The carotid artery lies here. Do not occlude it.",
            "st12": "The lung apex is deep. Do not press straight down.",
            "st17": "The nipple is a landmark. Do not needle or pinch it.",
            "ren1": "Perineum. Included so the Ren sequence is complete. Not a self-care point.",
            "ren8": "The navel. Modern teaching does not needle it.",
            "ren22": "The suprasternal fossa lies over the trachea. Very light touch only.",
            "du15": "Upper neck. The spinal cord is deep. Do not press hard.",
            "du16": "Below the occiput. Do not press upward under the skull.",
            "lv12": "The femoral vessels are nearby. Study the site. Do not press the artery.",
            "ht1": "The axillary artery is beside this point. Stay off the pulse.",
        }.get(pid, "A finding spot for this number. Stop if the tissue is sharply tender.")
        summary = f"{code} {pinyin}. A classical point, listed so the channel sequence is complete."
        actions = "Included to complete the classical numbering. Local use follows the channel. This atlas does not add a special treatment claim."
        if roles:
            actions = f"{', '.join(roles)}. " + actions
        point = {
            "id": pid,
            "code": code,
            "pinyin": pinyin,
            "hanzi": hanzi,
            "english": english,
            "channelId": channel,
            "order": number,
            "region": region,
            "location": LOC[pid],
            "nearby": nearby,
            "actions": actions,
            "summary": summary,
            "symptoms": [],
            "kinds": kinds,
            "roles": roles,
            "safety": safety,
            "press": "Light finger contact, 20–30 seconds, only if the skin is healthy. This is for learning the site.",
            "skip": "Skip broken skin, sharp pain, swelling, or any symptom that worries you.",
            "needleDepth": "Confirm depth in a current manual. Not a home needle.",
            "needleAngle": "As charted for a licensed practitioner. Do not needle yourself.",
            "electro": "none",
            "herbIds": [],
            "tags": [pid, pinyin.lower().replace(" ", "")],
        }
        lines.append("  {")
        for key, value in point.items():
            lines.append(f"    {key}: {json.dumps(value, ensure_ascii=False)},")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    OUT.write_text("\n".join(lines))


def main() -> None:
    expected = [f"{ch}{n}" for ch, count in COUNTS.items() for n in range(1, count + 1)]
    missing_loc = [pid for pid in expected if pid not in LOC]
    if missing_loc:
        raise SystemExit("missing locations: " + ", ".join(missing_loc))
    if len(NAMES) != 361:
        raise SystemExit(f"names {len(NAMES)}")
    long = [(pid, words(LOC[pid]), LOC[pid]) for pid in expected if words(LOC[pid]) > 28]
    if long:
        for row in long:
            print("LONG", row[0], row[1], row[2])
        raise SystemExit(f"{len(long)} locations over 28 words")
    have = existing_ids()
    # extras such as yintang are not in expected
    replace_locations(have)
    missing = [pid for pid in expected if pid not in have]
    emit(missing)
    print(f"locations updated among {len(have & set(expected))} existing classical points")
    print(f"filled {len(missing)} points")
    print("total classical", len(expected))


if __name__ == "__main__":
    main()
