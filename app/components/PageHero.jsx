import Link from 'next/link';

export default function PageHero({ kicker, title, description, children }) {
  return <main className="inner-page"><section className="page-intro"><p className="kicker">{kicker}</p><h1>{title}</h1><p>{description}</p>{children}</section></main>;
}
