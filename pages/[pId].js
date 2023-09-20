import { Fragment } from "react";
import path from 'path';
import { promises as fs} from 'fs';

export default function ProductDetailPage(props) {

    const { loadedProduct } = props;

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

export async function getStaticProps(context) {

    const { params } = context;
    const productId = params.pId;

    const jsonDir = path.join(process.cwd() + '/data');
    const staticData = await fs.readFile(jsonDir + '/dummy-backend.json', 'utf-8');
    const data = JSON.parse(staticData)

    const product = data.products.find(product => product.id === productId)

    return {
        props: {
            loadedProduct: product
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { pId: 'p1'}},
            { params: { pId: 'p2'}},
            { params: { pId: 'p3'}},
        ],
        fallback: false
    }
}