"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Film = { title: string; year: number };
const rawWinners: [string, number][] = [
  ["Wings",1929],["The Broadway Melody",1930],["All Quiet on the Western Front",1931],["Cimarron",1932],["Grand Hotel",1933],["Cavalcade",1934],["It Happened One Night",1935],["Mutiny on the Bounty",1936],["The Great Ziegfeld",1937],["The Life of Emile Zola",1938],["You Can't Take It with You",1939],["Gone with the Wind",1940],["Rebecca",1941],["How Green Was My Valley",1942],["Mrs. Miniver",1943],["Casablanca",1944],["Going My Way",1945],["The Lost Weekend",1946],["The Best Years of Our Lives",1947],["Gentleman's Agreement",1948],["Hamlet",1949],["All the King's Men",1950],["All About Eve",1951],["An American in Paris",1952],["The Greatest Show on Earth",1953],["From Here to Eternity",1954],["On the Waterfront",1955],["Marty",1956],["Around the World in 80 Days",1957],["The Bridge on the River Kwai",1958],["Gigi",1959],["Ben-Hur",1960],["The Apartment",1961],["West Side Story",1962],["Lawrence of Arabia",1963],["Tom Jones",1964],["My Fair Lady",1965],["The Sound of Music",1966],["A Man for All Seasons",1967],["In the Heat of the Night",1968],["Oliver!",1969],["Midnight Cowboy",1970],["Patton",1971],["The French Connection",1972],["The Godfather",1973],["The Sting",1974],["The Godfather Part II",1975],["One Flew Over the Cuckoo's Nest",1976],["Rocky",1977],["Annie Hall",1978],["The Deer Hunter",1979],["Kramer vs. Kramer",1980],["Ordinary People",1981],["Chariots of Fire",1982],["Gandhi",1983],["Terms of Endearment",1984],["Amadeus",1985],["Out of Africa",1986],["Platoon",1987],["The Last Emperor",1988],["Rain Man",1989],["Driving Miss Daisy",1990],["Dances with Wolves",1991],["The Silence of the Lambs",1992],["Unforgiven",1993],["Schindler's List",1994],["Forrest Gump",1995],["Braveheart",1996],["The English Patient",1997],["Titanic",1998],["Shakespeare in Love",1999],["American Beauty",2000],["Gladiator",2001],["A Beautiful Mind",2002],["Chicago",2003],["The Lord of the Rings: The Return of the King",2004],["Million Dollar Baby",2005],["Crash",2006],["The Departed",2007],["No Country for Old Men",2008],["Slumdog Millionaire",2009],["The Hurt Locker",2010],["The King's Speech",2011],["The Artist",2012],["Argo",2013],["12 Years a Slave",2014],["Birdman",2015],["Spotlight",2016],["Moonlight",2017],["The Shape of Water",2018],["Green Book",2019],["Parasite",2020],["Nomadland",2021],["CODA",2022],["Everything Everywhere All at Once",2023],["Oppenheimer",2024],["Anora",2025],["One Battle after Another",2026]
];
const winners: Film[] = rawWinners.map(([title, year]) => ({ title, year }));
const eras = [
  { label: "Todos", range: [1929, 2026] }, { label: "Era de ouro", range: [1929, 1959] },
  { label: "Nova Hollywood", range: [1960, 1989] }, { label: "Contemporâneos", range: [1990, 2026] },
] as const;

export default function Home() {
  const [era, setEra] = useState(0), [rotation, setRotation] = useState(0), [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState<Film>(winners.at(-1)!); const [history, setHistory] = useState<Film[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pool = useMemo(() => winners.filter(f => f.year >= eras[era].range[0] && f.year <= eras[era].range[1]), [era]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const dpr = window.devicePixelRatio || 1, size = 680;
    canvas.width = size*dpr; canvas.height = size*dpr; const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.scale(dpr,dpr); const c=size/2, radius=c-18, slice=Math.PI*2/pool.length, colors=["#9d172c","#e0a82e","#f1e3c0","#203b36"];
    pool.forEach((film,index) => { const start=index*slice-Math.PI/2; ctx.beginPath();ctx.moveTo(c,c);ctx.arc(c,c,radius,start,start+slice);ctx.closePath();ctx.fillStyle=colors[index%4];ctx.fill();ctx.strokeStyle="rgba(20,16,13,.22)";ctx.lineWidth=.8;ctx.stroke();
      if(pool.length<=35||index%Math.ceil(pool.length/24)===0){ctx.save();ctx.translate(c,c);ctx.rotate(start+slice/2);ctx.textAlign="right";ctx.fillStyle=index%4===2?"#3a2318":"#fff8e8";ctx.font=`700 ${pool.length>40?11:13}px Arial`;ctx.fillText(String(film.year),radius-20,4);ctx.restore();}});
    ctx.beginPath();ctx.arc(c,c,73,0,Math.PI*2);ctx.fillStyle="#111815";ctx.fill();ctx.beginPath();ctx.arc(c,c,57,0,Math.PI*2);ctx.strokeStyle="#e0a82e";ctx.lineWidth=2;ctx.stroke();ctx.fillStyle="#f5ead0";ctx.textAlign="center";ctx.font="700 15px Arial";ctx.fillText("THE OSCARS",c,c-5);ctx.fillStyle="#d7a630";ctx.font="700 10px Arial";ctx.fillText("BEST PICTURE",c,c+14);
  },[pool]);

  function spin(){ if(spinning)return; const index=Math.floor(Math.random()*pool.length),step=360/pool.length,normalized=((rotation%360)+360)%360;setSpinning(true);setRotation(rotation+(360-normalized)+2520-(index*step+step/2));window.setTimeout(()=>{const film=pool[index];setSelected(film);setHistory(prev=>[film,...prev].slice(0,3));setSpinning(false);},4600); }
  return <main><header><a className="brand" href="#top"><span className="brandMark">CF</span><span>CINE FORTUNA</span></a><div className="edition"><span>◆</span> 98 vencedores · 1929—2026</div></header>
    <section className="hero" id="top"><div className="intro"><p className="eyebrow">SEU PRÓXIMO GRANDE FILME</p><h1>Deixe o <em>cinema</em><br/>escolher por você.</h1><p className="lede">Uma roleta. Quase um século de histórias. Gire e descubra qual vencedor do Oscar de Melhor Filme merece a sua próxima sessão.</p>
      <div className="filters" role="group" aria-label="Filtrar filmes por época">{eras.map((item,index)=><button key={item.label} className={era===index?"active":""} onClick={()=>{if(!spinning)setEra(index)}}>{item.label}</button>)}</div>
      <div className="result" aria-live="polite"><span className="resultLabel">{spinning?"A SORTE ESTÁ GIRANDO...":history.length?"A ESCOLHA DA NOITE":"ÚLTIMO VENCEDOR"}</span><strong>{spinning?"?":selected.title}</strong><span className="year">{spinning?"····":selected.year}</span></div></div>
      <div className="wheelStage"><div className="pointer"/><div className="wheelFrame"><canvas ref={canvasRef} className="wheel" style={{transform:`rotate(${rotation}deg)`}} aria-label={`Roleta com ${pool.length} vencedores do Oscar de Melhor Filme`}/><div className="wheelGlow"/></div><button className="spinButton" onClick={spin} disabled={spinning}><span>{spinning?"GIRANDO":"GIRAR A ROLETA"}</span><b>→</b></button><p className="hint">Clique para girar · {pool.length} filmes na seleção</p></div></section>
    <footer><div><span className="footerLabel">SUA ÚLTIMA SESSÃO</span>{history.length===0?<p>Ainda não há escolhas. A primeira pode ser um clássico.</p>:<div className="history">{history.map((film,i)=><span key={`${film.title}-${i}`}><b>{String(i+1).padStart(2,"0")}</b>{film.title}<small>{film.year}</small></span>)}</div>}</div><p className="note">Lista baseada nos vencedores de Melhor Filme da Academia.<span>Feito para quem leva a escolha do filme a sério.</span></p></footer></main>;
}
