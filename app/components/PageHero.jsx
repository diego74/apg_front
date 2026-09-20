import { InnerPage, PageIntro, Kicker } from './styles';

export default function PageHero({ kicker, title, description, children }) {
  return <InnerPage><PageIntro><Kicker>{kicker}</Kicker><h1>{title}</h1><p>{description}</p>{children}</PageIntro></InnerPage>;
}
