'use client';

import styled, { createGlobalStyle, css } from 'styled-components';
import Link from 'next/link';

export const GlobalStyles = createGlobalStyle`
  :root { --red:#ff1d17; --ink:#0d1b2b; --cream:#f7f6f1; --line:#d8ddd8; --lime:#b7ff59; }
  * { box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { margin:0; color:var(--ink); background:var(--cream); font-family:Manrope,sans-serif; }
  a { color:inherit; }
  button { font:inherit; }
  @media(prefers-reduced-motion:reduce) { html { scroll-behavior:auto; } }
`;

export const Header = styled.header`
  height:84px; background:var(--red); color:#fff; position:relative; z-index:10;
  @media(max-width:900px) { height:72px; }
`;
export const Nav = styled.nav`
  height:100%; width:100%; margin:auto; padding:0 42px;
  display:flex; align-items:center; justify-content:space-between; gap:32px;
  @media(max-width:1100px) { padding:0 24px; gap:20px; }
`;
export const Logo = styled(Link)`
  flex-shrink:0; width:162px; text-decoration:none; display:flex; flex-direction:column; line-height:.9;
  span { font:700 italic 31px Unbounded,sans-serif; letter-spacing:-3px; }
  small { font:600 7px Manrope,sans-serif; letter-spacing:1.1px; margin-top:8px; }
`;
export const NavLinks = styled.div`
  display:flex; align-items:stretch; justify-content:flex-end; gap:26px; margin-left:auto; height:100%;
  @media(max-width:1100px) { gap:16px; }
  @media(max-width:900px) {
    position:absolute; top:72px; left:0; right:0; height:auto;
    display:${({ $open }) => $open ? 'flex' : 'none'};
    padding:14px 24px 22px; background:#102236; flex-direction:column; align-items:stretch; gap:0;
  }
`;
export const NavItem = styled.div`
  position:relative; display:flex; align-items:center;
  > a { display:block; font-weight:800; text-decoration:none; font-size:14px; white-space:nowrap; }
  > a::after { content:''; height:2px; width:0; background:#fff; display:block; transition:width .2s; }
  &:hover > a::after { width:100%; }
  @media(max-width:1100px) { > a { font-size:12px; } }
  @media(max-width:900px) {
    display:grid; grid-template-columns:1fr auto;
    > a { padding:13px 0; font-size:14px; }
  }
`;
export const ExpandButton = styled.button`
  display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px;
  margin-left:5px; padding:5px; border:1px solid transparent; border-radius:9px;
  background:transparent; color:inherit; cursor:pointer; transition:background .2s,border-color .2s;
  svg { width:18px; height:18px; transition:transform .2s ease; }
  &:hover, &[aria-expanded='true'] { background:#ffffff18; border-color:#ffffff24; }
  &[aria-expanded='true'] svg { transform:rotate(180deg); }
  &:focus-visible { outline:2px solid var(--lime); outline-offset:3px; }
  @media(max-width:900px) { width:36px; height:36px; }
  @media(prefers-reduced-motion:reduce) { &, svg { transition:none; } }
`;
export const Dropdown = styled.div`
  position:absolute; top:69px; right:0; min-width:220px;
  display:${({ $open }) => $open ? 'block' : 'none'};
  background:#102236; color:#fff; border:1px solid #ffffff22;
  border-radius:12px; box-shadow:0 18px 35px #06101c42; padding:8px;
  a { display:flex; justify-content:space-between; gap:20px; padding:12px 10px; text-decoration:none; font-size:13px; font-weight:700; border-radius:6px; }
  a:hover { background:#ffffff12; }
  span { color:var(--lime); }
  @media(max-width:900px) { grid-column:1/-1; position:static; min-width:0; background:transparent; box-shadow:none; border:0; padding:0 0 4px 12px; a { padding:8px 5px; } }
`;
export const MenuToggle = styled.button`
  display:none; margin-left:auto; padding:10px; border:0; background:transparent; cursor:pointer;
  i { display:block; width:24px; height:2px; background:#fff; }
  @media(max-width:900px) { display:flex; flex-direction:column; gap:5px; }
`;

export const HomeBanner = styled.section`
  position:relative;
`;
export const HomeInfoLink = styled(Link)`
  position:absolute; left:5%; bottom:5%; display:inline-flex; align-items:center; gap:24px;
  padding:16px 26px; border:2px solid #fff; border-radius:999px;
  background:var(--red); color:#fff; font-size:16px; font-weight:800; text-decoration:none;
  box-shadow:0 6px 20px #0d1b2b33; transition:transform .2s,background .2s;
  span { font-size:22px; line-height:1; }
  &:hover { background:#d91812; transform:translateY(-2px); }
  &:focus-visible { outline:3px solid var(--ink); outline-offset:4px; }
  @media(max-width:760px) { left:16px; bottom:12px; padding:10px 18px; gap:12px; font-size:14px; }
  @media(prefers-reduced-motion:reduce) { transition:none; }
`;
export const HomeImage = styled.img`
  display:block; width:100%; height:auto;
`;
export const Kicker = styled.p`
  font:600 11px 'DM Mono',monospace; letter-spacing:.15em; margin:0 0 20px; color:var(--red);
`;
export const IntroBand = styled.section`
  padding:130px max(7.5vw,35px); display:grid; grid-template-columns:1.3fr .8fr; gap:10px; background:#fff;
  ${Kicker} { grid-column:1/-1; }
  h2 { font:600 clamp(2.5rem,4vw,4.7rem)/1 Unbounded,sans-serif; margin:0; letter-spacing:-.09em; }
  > p:not(${Kicker}) { align-self:end; max-width:400px; font-size:17px; line-height:1.65; }
  @media(max-width:760px) { display:block; padding-top:80px; padding-bottom:80px; h2 { margin-bottom:28px; } }
`;
export const TextLink = styled(Link)`
  font-weight:800; text-decoration:none; border-bottom:2px solid var(--red); padding-bottom:8px; width:max-content;
  span { color:var(--red); margin-left:16px; }
`;
export const QuickLinks = styled.section`
  display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid var(--line); background:#fff;
  a { padding:42px max(2.5vw,25px); border-right:1px solid var(--line); text-decoration:none; display:grid; grid-template-columns:auto 1fr auto; gap:19px; align-items:center; }
  span { font:11px 'DM Mono',monospace; color:#8a918e; }
  b { font:600 18px Unbounded,sans-serif; letter-spacing:-1px; }
  i { font-size:25px; color:var(--red); font-style:normal; }
  a:hover { background:var(--red); color:#fff; span,i { color:var(--lime); } }
  @media(max-width:760px) { grid-template-columns:1fr; a { padding:27px 25px; } }
`;
export const InnerPage = styled.main`
  min-height:calc(100vh - 84px); padding:92px max(7.5vw,35px);
  background:radial-gradient(circle at 100% 0,#d7ffc32e,transparent 30%),var(--cream);
  @media(max-width:760px) { min-height:calc(100vh - 72px); padding-top:65px; }
`;
export const PageIntro = styled.section`
  max-width:1100px;
  > h1 { font:600 clamp(3rem,6vw,6.1rem)/.98 Unbounded,sans-serif; letter-spacing:-.09em; margin:0; }
  > p:not(${Kicker}) { max-width:620px; font-size:18px; line-height:1.65; margin:27px 0 60px; }
  @media(max-width:760px) { > h1 { font-size:clamp(2.75rem,12vw,4.5rem); } > p:not(${Kicker}) { margin-bottom:35px; } }
`;
export const Button = styled(Link)`
  display:inline-flex; gap:28px; align-items:center; text-decoration:none; padding:15px 21px;
  font-weight:800; color:#101b26; background:var(--lime); border:1px solid var(--lime);
  span { font-size:20px; } &:hover { transform:translateY(-2px); }
`;
export const InfoGrid = styled.div`
  display:grid; grid-template-columns:repeat(3,1fr); gap:15px; margin-bottom:36px;
  article { background:#102236; color:#fff; padding:28px; min-height:200px; }
  b { color:var(--lime); font:12px 'DM Mono',monospace; }
  h2 { font:600 20px Unbounded,sans-serif; letter-spacing:-1px; }
  p { line-height:1.55; color:#dbe3e8; }
  @media(max-width:760px) { grid-template-columns:1fr; }
`;
const listRow = css`
  border-top:1px solid #bdc6c5; margin:0; padding:23px 0; display:flex; gap:25px; align-items:center; font-size:18px; font-weight:700;
`;
export const RuleList = styled.div`
  margin:40px 0; p { ${listRow} } b { font:13px 'DM Mono',monospace; color:var(--red); }
`;
export const RankingList = styled.div`
  margin:40px 0; p { ${listRow} justify-content:space-between; }
  b { font:13px 'DM Mono',monospace; color:var(--red); }
  strong { margin-right:auto; } span { font:13px 'DM Mono',monospace; color:#69716f; }
`;
export const EventList = styled.div`
  margin:40px 0; article { ${listRow} display:grid; grid-template-columns:70px 1fr auto; }
  article > div b { display:block; font:600 35px/1 Unbounded,sans-serif; }
  article > div span { font:10px 'DM Mono',monospace; color:var(--red); }
  p { margin:0; } strong,small { display:block; }
  small { color:#65706d; font-weight:500; margin-top:5px; }
  i { font-style:normal; font-size:13px; color:var(--red); }
  @media(max-width:760px) { article { grid-template-columns:60px 1fr; } i { display:none; } }
`;
export const QuoteCard = styled.div`
  background:#102236; color:#fff; padding:28px; min-height:200px; max-width:720px;
  p { font:600 27px/1.3 Unbounded,sans-serif; margin:0 0 30px; }
  span { font:10px 'DM Mono',monospace; color:var(--lime); }
`;
export const Footer = styled.footer`
  background:#102236; color:#fff; padding:35px max(7.5vw,35px); display:flex; gap:30px; align-items:center;
  span { font:600 25px Unbounded,sans-serif; letter-spacing:-2px; }
  p { margin:0; color:#b9c2c8; font-size:13px; }
  @media(max-width:760px) { display:block; p { margin-top:12px; } }
`;
