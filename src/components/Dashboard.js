import React from 'react'
import {
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
	ReferenceLine,
	Line,
	LineChart,
} from 'recharts'
import styled from 'styled-components'

const Matrix = styled.div`
	&:before {
		content: ' ';
		width: 1px;
		height: 66%;
		display: block;
		background-color: ${(props) => props.bg};
	}
`

const Dashboard = () => {
	return (
		<section className="">
			<div className="w-full h-72 bg-gray-50 flex flex-row content-around shadow-md border-b-2 border-gray-50 ">
				<div className="w-1/3 text-center px-3 py-3">
					<RenderLineChart />
					<h3 className="text-lg text-gray-300">
						Estimated Time of Completion
					</h3>
				</div>
				<Matrix className="w-1/3 text-center border-l-2 border-r-2 border-gray-200 px-3 py-3">
					<RenderLineChart />
					<h3 className="text-lg text-gray-300">Dedication Matrix</h3>
				</Matrix>
				<div className="w-1/3 text-center px-3 py-3">
					<h3 className="text-lg text-gray-300">Hours Completed</h3>
				</div>
			</div>
			<div className="flex flex-col flex-wrap px-4 py-3">
				<div className="flex flex-col lg:flex-row relative max-w-full">
					<Panel className="mx-4 my-4 lg:w-1/2 w-full">
						<h1 className="text-xl my-2">Your assignments</h1>
						<RenderLineChart />
					</Panel>
					<Panel className="mx-4 my-4 lg:w-1/2 w-full">
						<h1 className="text-xl my-2">Your courses</h1>
					</Panel>
				</div>

				<div className="flex flex-col lg:flex-row relative max-w-full">
					<Panel className="mx-4 my-4 lg:w-1/2 w-full">
						<h1 className="text-xl my-2">Assignment type scores</h1>
					</Panel>
					<Panel className="mx-4 my-4 lg:w-1/2 w-full">
						<h1 className="text-xl my-2">Module learning format</h1>
					</Panel>
				</div>
			</div>
		</section>
	)
}

const Panel = ({ children, className }) => {
	return (
		<div
			className={`bg-gray-50 border border-gray-100 rounded-sm shadow-md w-2/3 h-96 lg:w-1/2 md:h-96 lg:h-96 max-h-screen relative py-2 px-3 ${className}`}
		>
			{children}
		</div>
	)
}

const RenderLineChart = () => {
	const data = [
		{
			name: 'Assignment 1',
			you: 95,
			avg: 96,
		},
		{
			name: 'Assignment 2',
			you: 95,
			avg: 74,
		},
		{
			name: 'Assignment 3',
			you: 78,
			avg: 57,
		},
		{
			name: 'Assignment 4',
			you: 64,
			avg: 48,
		},
		{
			name: 'Assignment 5',
			you: 30,
			avg: 76,
		},
		{
			name: 'Assignment 6',
			you: 76,
			avg: 80,
		},
		{
			name: 'Assignment 7',
			you: 80,
			avg: 91,
		},
	]

	return (
		<ResponsiveContainer width="100%" height="80%">
			<LineChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 20,
					right: 50,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis type="number" domain={[0, 100]} />
				<Tooltip />
				<Line
					dataKey="avg"
					type="monotone"
					stroke="#82ca9d"
					dot={{ stroke: 'black', strokeWidth: 1 }}
				/>
				<Line
					dataKey="you"
					type="monotone"
					stroke="#ffc658"
					dot={{ stroke: 'black', strokeWidth: 1 }}
				/>
				<ReferenceLine
					y={75}
					stroke="red"
					isFront={true}
					strokeDasharray="2 2"
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

export default Dashboard
