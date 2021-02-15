import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'

import formatThousand from 'helpers/formatThousand';
import formatDate from 'helpers/formatDate'
import Sidebar from 'parts/Sidebar'
import Congratulations from 'parts/Congratulations'
import EmptyState from 'parts/EmptyState'

import APIorder from 'API/APIorder'
import LoadingScreen from 'parts/Loading'
import { fetchOrders, messageOrder, statusOrders } from 'store/actions/orders'

function Transactions() {

    const dispatch = useDispatch()
    const ORDERS = useSelector(state => state.orders )

    const location = useLocation()

    const params = location?.search.length > 0 && location?.search?.substring(1, location.length)?.split?.("&")?.reduce?.( (acc, item) => {
        const [key, value] = item.split("=")
        acc[key] = value

        return acc
    }, {})

    useEffect(() => {
        document.title = "Devlits | Transactions"
        window.scroll(0,0)

        dispatch(statusOrders("loading"))
        APIorder.all()
        .then( res => {
            dispatch(fetchOrders(res.data))
        })
        .catch( err => {
            dispatch(messageOrder(err?.response?.data?.message ?? 'Oh No! Error Dude'))
        })
    }, [dispatch])

    return (
        <div className="flex">
            <Sidebar></Sidebar>
            <main className="flex-1">
                <div className="px-16">

                    {ORDERS.status === "loading" && <LoadingScreen/>}
                    {ORDERS.status === "error" && ORDERS.message}
                    {ORDERS.status === "ok" && 
                        params.order_id ? <Congratulations data={ORDERS.data[params.order_id]} />
                        : ORDERS.total > 0 ?
                        <>
                            <section className="flex flex-col mt-8">
                                <h1 className="text-4xl text-gray-900 font-medium">
                                    Transactions
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Keep on tract what you've invested
                                </p>
                            </section>
                            <section className="flex flex-col mt-8">
                                {
                                    Object.values(ORDERS.data)?.map?.((item) => {
                                        return (
                                            <div key={item.id} className="flex justify-start items-center -mx-4 mt-5">
                                                <div className="w-auto px-4" style={{ width: 150 }}>
                                                    <img src={item?.metadata?.course_thumbnail ?? ''} alt={item?.metadata?.course_name ?? 'Alternative name'}/>
                                                </div>
                                                <div className="w-3/12 px-4">
                                                    <h6 className="text-gray-900 text-lg">{item?.metadata?.course_name ?? 'Name Course'}</h6>
                                                    <p className="text-gray-600 text-md">-{item?.metadata?.course_level ?? 'Level Course'}-</p>
                                                </div>
                                                <div className="w-2/12 px-4">
                                                    <h6 className="text-gray-900 text-lg">Rp. {formatThousand(item?.metadata?.course_price ?? 0)}</h6>
                                                </div>
                                                <div className="w-2/12 px-4">
                                                    <p className="text-gray-600 text-md">{item?.created_at ? formatDate(item?.created_at) : '-'}
                                                    </p>
                                                </div>
                                                <div className="w-3/12 px-4">
                                                    {
                                                        item?.status === "pending" && <Link className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 focus:outline-none text-white px-6 py-3 mt-4" to={`/joined/${item?.course_id}`}>Selesaikan Transaksi</Link>
                                                    }
                                                    {
                                                        item?.status === "success" && <Link className="bg-blue-300 hover:bg-blue-400 transition-all duration-200 focus:outline-none text-gray-800 px-6 py-3 mt-4" to={`/courses/${item?.course_id}`}>Lihat Kelas</Link>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </section>
                        </>
                        : <EmptyState />
                    }
                </div>
            </main>
        </div>
    )
}

export default Transactions
