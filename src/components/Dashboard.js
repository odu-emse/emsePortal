import Container from './Container'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

/**
 * @var {object[]} data
 * @memberof Dashboard
 * @description Mock data that represents progresses of individual courses containing progress from 3 different students.
 * @example
 * [
 * {
 *  subject: 'ENMA 601',
 *  A: 50,
 *  B: 76,
 *  C: 90,
 *  fullMark: 150
 * }
 * ]
 */
const data = [
	{
		subject: 'ENMA 600',
		A: 50,
		B: 98,
		C: 150,
		fullMark: 150,
	},
	{
		subject: 'ENMA 601',
		A: 48,
		B: 87,
		C: 130,
		fullMark: 150,
	},
	{
		subject: 'ENMA 603',
		A: 52,
		B: 71,
		C: 120,
		fullMark: 150,
	},
	{
		subject: 'ENMA 604',
		A: 99,
		B: 120,
		C: 150,
		fullMark: 150,
	},
	{
		subject: 'ENMA 614',
		A: 62,
		B: 70,
		C: 120,
		fullMark: 150,
	},
	{
		subject: 'ENMA 715',
		A: 25,
		B: 55,
		C: 130,
		fullMark: 150,
	},
]

/**
 * @var {object[]} timeOfCompletion
 * @memberof Dashboard
 * @description Mock data that represents that time of completion of modules/assignments aggregated over time binned by months.
 * @example
 * [
 * {
 * name: "January",
 * you: "385",
 * },
 * ]
 */
const timeOfCompletion = [
	{
		name: 'January',
		you: 100,
	},
	{
		name: 'February',
		you: 195,
	},
	{
		name: 'March',
		you: 305,
	},
	{
		name: 'April',
		you: 380,
	},
	{
		name: 'May',
		you: 370,
	},
	{
		name: 'June',
		you: 265,
	},
	{
		name: 'July',
		you: 220,
	},
	{
		name: 'August',
		you: 175,
	},
	{
		name: 'September',
		you: 140,
	},
	{
		name: 'October',
		you: 100,
	},
	{
		name: 'November',
		you: 80,
	},
	{
		name: 'December',
		you: 65,
	},
]
/**
 * @name Dashboard
 * @component
 * @returns {React.ReactHTMLElement} - The Dashboard page
 * @description A React component that renders the Dashboard page completely
 */
export default function Dashboard() {
	return (
		<section className="w-full overflow-x-hidden">
			<div className="w-full h-auto xl:h-72 bg-gray-50 flex flex-col xl:flex-row justify-between items-center xl:content-around shadow-md border-b-2 border-gray-50 ">
				<div className="w-full xl:w-1/4 h-full text-center px-3 py-3">
					<ResponsiveContainer width="100%" height="80%">
						<LineChart
							width={500}
							height={300}
							data={timeOfCompletion}
							margin={{
								top: 20,
								right: 50,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis type="number" domain={[0, 400]} />
							<Tooltip />
							<Line
								dataKey="you"
								type="monotone"
								stroke="#92C1E9"
								dot={{ stroke: '#92C1E9', strokeWidth: 1 }}
							/>
						</LineChart>
					</ResponsiveContainer>
					<h3 className="text-lg text-gray-300">
						Estimated Time of Completion
					</h3>
				</div>
				<div className="w-4/5 xl:w-2/4 h-full text-center border-b-2 border-t-2 xl:border-l-2 xl:border-r-2 xl:border-t-0 xl:border-b-0 border-gray-200 px-3 py-3">
					<ResponsiveContainer width="100%" height="80%">
						<RadarChart
							cx="50%"
							cy="50%"
							outerRadius="80%"
							data={data}
						>
							<PolarGrid />
							<PolarAngleAxis dataKey="subject" />
							<Radar
								name="Current semester"
								dataKey="A"
								stroke="#e74d3c"
								fill="#e74d3c"
								fillOpacity={0.5}
							/>
							<Radar
								name="Next semester"
								dataKey="B"
								stroke="#f39d12"
								fill="#f39d12"
								fillOpacity={0.5}
							/>
							<Radar
								name="Projected semester"
								dataKey="C"
								stroke="#7ccc63"
								fill="#7ccc63"
								fillOpacity={0.5}
							/>
							<Legend
								iconType={'diamond'}
								layout="vertical"
								align="right"
								verticalAlign="middle"
								margin={{
									top: 0,
									right: 0,
									bottom: 0,
									left: 150,
								}}
							/>
						</RadarChart>
					</ResponsiveContainer>
					<h3 className="text-lg text-gray-300">
						Course Material Matrix
					</h3>
				</div>
				<div className="w-full xl:w-1/4 h-full text-center px-3 py-3 ">
					<div className="h-4/5 flex items-center justify-center">
						<h2 className="text-7xl">
							<span className="text-yellow-500">528</span>/1500
						</h2>
					</div>
					<h3 className="text-lg text-gray-300">Hours Completed</h3>
				</div>
			</div>
			<Container>
				<div className="w-full flex flex-col flex-wrap md:px-4 md:py-3">
					<div className="flex flex-col lg:flex-row relative max-w-full">
						<Panel className="md:mx-4 md:my-4 my-2 lg:w-1/2 w-full">
							<h1 className="text-xl my-2">Your assignments</h1>
							<RenderLineChart />
						</Panel>
						<Panel className="md:mx-4 md:my-4 my-2 lg:w-1/2 w-full">
							<h1 className="text-xl my-2">Your courses</h1>
						</Panel>
					</div>

					<div className="flex flex-col lg:flex-row relative max-w-full">
						<Panel className="md:mx-4 md:my-4 my-2 lg:w-1/2 w-full">
							<h1 className="text-xl my-2">
								Assignment type scores
							</h1>
						</Panel>
						<Panel className="md:mx-4 md:my-4 my-2 lg:w-1/2 w-full">
							<h1 className="text-xl my-2">
								Module learning format
							</h1>
						</Panel>
					</div>
				</div>
			</Container>
		</section>
	)
}

/**
 * @name Panel
 * @function
 * @memberof Dashboard
 * @description A wrapper component that adds styles and different size variations to the child component that is being passed in via props.
 * @param {React.ReactChild} children - A React Component that we want to render inside the panel wrapper
 * @param {string} className - A string of values that will be inserted into the HTML class attribute that is present in the returned wrapper
 * @returns {React.ReactHTMLElement} - The complete child argument wrapped in a div with the appropriate styles applied
 */
const Panel = ({ children, className }) => {
	return (
		<div
			className={`bg-gray-50 border border-gray-100 rounded-sm shadow-md w-full md:w-2/3 h-auto lg:w-1/2 md:h-96 lg:h-96 max-h-screen relative py-2 px-3 ${className}`}
		>
			{children}
		</div>
	)
}

/**
 * @name RenderLineChart
 * @function
 * @memberof Dashboard
 * @description A simple wrapper component that contains mock data for the line chart. This is a temporary solution until we can get the data from the API.
 * @returns {React.Component} - The line chart component that handles the way the data is visualized
 * @todo Replace the mock data with the data from the API
 */
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
