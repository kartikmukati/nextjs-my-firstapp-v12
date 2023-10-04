import { useEffect, useState } from "react";
import useSWR from 'swr'


const LastSales = (props) => {

    const [sales, setSales] = useState(props.sales);

    const fetcher = (...arg) => fetch(...arg).then(res => res.json())

    const {data, error } = useSWR('https://nextjs-my-firstapp-v12-default-rtdb.firebaseio.com/sales.json', fetcher)


    useEffect(() => {
        if(data) {
            const transformedSales = [];
                    for(const key in data) {
                        transformedSales.push({
                            id: key,
                            username: data[key].username,
                            volume: data[key].volume
                        })
                    }

                    setSales(transformedSales);
        }
    }, [data])

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch('https://nextjs-my-firstapp-v12-default-rtdb.firebaseio.com/sales.json')
    //     .then(response => response.json()).then(data => {
    //         const transformedSales = [];
    //         for(const key in data) {
    //             transformedSales.push({
    //                 id: key,
    //                 username: data[key].username,
    //                 volume: data[key].volume
    //             })
    //         }

    //         setSales(transformedSales);
    //         setIsLoading(false);
    //     })
    // }, [])
    
    if(error) {
        return <p>Failed to load</p>
    }

    if(!data && !sales) {
        return <p>Loading..</p>
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>{sale.username} - ${sale.volume}</li>
            ))}
        </ul>
    )
}

export default LastSales;

export async function getStaticProps() {
    const response = await fetch('https://nextjs-my-firstapp-v12-default-rtdb.firebaseio.com/sales.json')
    const data = await response.json();

    const transformedSales = [];
    for(const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        })
    }

    return { 
        props: {
            sales: transformedSales
        },
    }
}