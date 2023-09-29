import path from 'path';
import { promises as fs} from 'fs';
import Link from 'next/link';

export default function Home(props) {

  const { products } = props;

  return (
  <ul>
    {products.map((product) => (
      <li key={product.id}><Link href={`/products/${product.id}`}><h1>{product.title}</h1></Link></li>
    ))}
  </ul>
  )
}

export async function getStaticProps() {

  const jsonDir = path.join(process.cwd() + '/data');
  const staticData = await fs.readFile(jsonDir + '/dummy-backend.json', 'utf-8');
  const data = JSON.parse(staticData)
  
  return {
    props: {
      products: data.products
    },
  }
}
