import { useState } from "react"

export default function Filters({filters}) {
    const [active, setActive] = useState(null)

    return filters && <>
        <div className="text-white flex flex-col justify-center">
            <ul className="px-6">
                {
                    filters.map(filter => (
                        <li className="group py-3 capitalize" key={filter.name}>
                            <a className="group-hover:text-4xl cursor-pointer" onClick={() => setActive(active => filter.name)}>
                                {filter.name} ({filter.data.length})
                            </a>
                            <ul className='max-h-0 group-hover:max-h-[300px] overflow-hidden overflow-y-visible transition-all duration-300'>
                                {
                                    filter.data.filter(data => data.properties.name).map((data,index) => (
                                        <li className="py-1 cursor-pointer" key={index}>
                                            {data.properties.name ?? ""}
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    </>
}