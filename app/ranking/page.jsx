import { RankingList } from '../components/styles';
import PageHero from '../components/PageHero';
const ranking=['Club Sakura','Perú Gateball Norte','Club Unión','Asociación Miraflores'];
export default function Ranking() { return <PageHero kicker="CLASIFICACIÓN" title="Ranking APG." description="Así marcha la División Principal en la temporada actual."><RankingList id="temporada">{ranking.map((team,index)=><p key={team}><b>0{index+1}</b><strong>{team}</strong><span>{120-index*13} pts</span></p>)}</RankingList></PageHero>; }
