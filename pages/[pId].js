import { Fragment } from "react";
import path from 'path';
import { promises as fs} from 'fs';

export default function ProductDetailPage(props) {

    const { loadedProduct } = props;

    if(!loadedProduct) {
        return <p>Loading...</p>
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

async function getData() {
    const jsonDir = path.join(process.cwd() + '/data');
    const staticData = await fs.readFile(jsonDir + '/dummy-backend.json', 'utf-8');
    const data = JSON.parse(staticData)

    return data;
}

export async function getStaticProps(context) {

    const { params } = context;
    const productId = params.pId;

    const data =await getData();

    const product = data.products.find(product => product.id === productId)

    if(!product) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            loadedProduct: product
        }
    }
}

export async function getStaticPaths() {

    const data =await getData();

    const ids = data.products.map((product) => product.id);

    const pathsWithParams = ids.map((id) => ( {params: {pId: id} } ))

    return {
        paths: pathsWithParams,
        fallback: true
    }
}