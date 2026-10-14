import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { GLOSSARY } from "@/data/glossary";

const TERMS = [...GLOSSARY].sort((a, b) => b.phrase.length - a.phrase.length);

type Hit = { start: number; end: number; id: string };

function hitsIn(text: string): Hit[] {
  const lower = text.toLowerCase();
  const taken = new Array<boolean>(text.length).fill(false);
  const hits: Hit[] = [];
  for (const term of TERMS) {
    const phrase = term.phrase.toLowerCase();
    let from = 0;
    while (from < text.length) {
      const start = lower.indexOf(phrase, from);
      if (start < 0) break;
      const end = start + phrase.length;
      const before = start === 0 || !/[A-Za-z0-9]/.test(text[start - 1] ?? "");
      const after = end === text.length || !/[A-Za-z0-9]/.test(text[end] ?? "");
      const free = taken.slice(start, end).every((cell) => !cell);
      if (before && after && free) {
        for (let index = start; index < end; index += 1) taken[index] = true;
        hits.push({ start, end, id: term.id });
      }
      from = start + phrase.length;
    }
  }
  hits.sort((a, b) => a.start - b.start);
  return hits;
}

export function LinkedText({ text }: { text: string }) {
  const hits = hitsIn(text);
  if (hits.length === 0) return <>{text}</>;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  hits.forEach((hit, index) => {
    if (hit.start > cursor) nodes.push(text.slice(cursor, hit.start));
    nodes.push(
      <Link
        key={`${hit.id}-${hit.start}-${index}`}
        to="/glossary"
        hash={hit.id}
        className="underline decoration-dotted underline-offset-4 text-earth"
      >
        {text.slice(hit.start, hit.end)}
      </Link>,
    );
    cursor = hit.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}
