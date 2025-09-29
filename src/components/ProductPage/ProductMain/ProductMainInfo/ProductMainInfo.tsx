'use client';

import { useCagesProductData } from "@/hooks/useCagesProductData";

export default function ProductMainInfo() {    
    const cages = useCagesProductData();

    return <div className="info">
        <h1 className="text-2xl font-bold mb-4">{cages.front.name}</h1>
        <p className="mb-2">{cages.front.description}</p>
        <p className="mb-2">Key Features:</p>
        <ul className="list-disc list-inside mb-4">
            <li>{cages.front.features[0]}</li>
            <li>{cages.front.features[1]}</li>
        </ul>
        <p className="mb-4">Whether you&apos;re commuting, touring, or running errands, the Cage Front provides a reliable solution for carrying your essentials while keeping your bike balanced and stable.</p>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600 transition">Add to Cart</button>
    </div>
}