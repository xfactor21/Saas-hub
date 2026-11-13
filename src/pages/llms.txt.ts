import products from '../data/products.json';
export function GET(){return new Response('# planet.X Apps\n> Seven independent business SaaS applications from planet.X.\n\n'+products.map(p=>'## '+p.name+'\n'+p.purpose+'\nOfficial website: '+p.home+'\nPricing: '+p.pricing).join('\n\n')+'\n\nEach app has separate authentication and billing.\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
