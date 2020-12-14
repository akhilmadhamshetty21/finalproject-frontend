import React from 'react'
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';

export default function Dashboard() {
    return (
        <div>
            <PieChart/>
            <BarChart/>
            <LineChart/>
        </div>
    )
}
