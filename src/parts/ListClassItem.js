import React from 'react'
import {Link} from 'react-router-dom'

import { ReactComponent as IconPlay } from 'assets/images/btn_play.svg'

export default function ListClassItem({ data }) {
    return (
        <div className="w-1/4 px-4">
            <div className="item relative">
                <figure className="item-image">
                    <IconPlay />
                    <img src={data?.thumbnail ?? ''} alt={data?.name ?? 'Course Name'}/>
                </figure>
                <div className="item-meta antialiased">
                    <h4 className="text-lg text-gray-900">{data?.name ?? 'Course Name'}</h4>
                    <h5 className="text-md text-gray-600">{data?.level ?? 'Level Course'}</h5>
                </div>
                <Link to={`/courses/${data?.id}`} className="link-wrapped"></Link>
            </div>
        </div>
    )
}
