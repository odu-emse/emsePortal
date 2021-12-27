import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getToken, decoder } from './helpers'
import { GoPerson, GoSignIn } from 'react-icons/go'
import { RiShutDownLine, RiUserSettingsLine } from 'react-icons/ri'
import { AiOutlinePartition } from 'react-icons/ai'
import {
	MdSpaceDashboard,
	MdLiveHelp,
	MdWidgets,
	MdOutlineExplore,
} from 'react-icons/md'
import { BsStack } from 'react-icons/bs'
import { BiTask } from 'react-icons/bi'

export default function Sidebar() {
	const [open, setOpen] = useState(false)
	const [dropdown, setDropdown] = useState(false)
	const [authenticated, setAuthenticated] = useState(false)

	const toggle = () => {
		setOpen(!open)
	}
	const openUser = () => {
		setDropdown(!dropdown)
	}
	const auth = () => {
		if (getToken() !== `Bearer ${null}`) {
			return setAuthenticated(true)
		} else {
			return setAuthenticated(false)
		}
	}
	useEffect(() => {
		auth()
	}, [authenticated])
	return (
		<div className={`nav relative h-screen ${open ? 'w-3/12' : 'w-1/12'} `}>
			<aside className="relative w-full flex flex-col bg-gray-800 h-full min-h-screen transition-all">
				<button
					className="inline-flex items-center justify-center py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white w-auto"
					aria-expanded="false"
					onClick={toggle}
				>
					<span className="sr-only">Open side menu</span>
					<svg
						className="block h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<svg
						className="hidden h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<div className="logo w-full flex items-center justify-center py-5">
					{open ? (
						<img
							className="block h-16 w-auto"
							src="https://www.odu.edu/content/dam/odu/logos/univ/png-72dpi/odu-sig-noidea-fullcolor.png"
							alt="Workflow"
						/>
					) : (
						<img
							className="block h-16 w-auto"
							src="https://www.odu.edu/content/dam/odu/logos/univ/png-72dpi/crown-r-2-color.png"
							alt="Workflow"
						/>
					)}
				</div>
				<div
					className={`menu relative h-full flex flex-col ${
						authenticated ? 'justify-between' : 'justify-end'
					}`}
				>
					{!authenticated === true ? (
						<>
							<NavLink
								to="/users/login"
								className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest ${
									!open && 'flex items-center justify-center'
								}`}
								activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
							>
								{open ? 'Login' : <GoSignIn size={30} />}
							</NavLink>
							<NavLink
								to="/users/register"
								className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest ${
									!open && 'flex items-center justify-center'
								}`}
								activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
							>
								{open ? 'Register' : <GoPerson size={30} />}
							</NavLink>
						</>
					) : (
						<>
							<div className="flex flex-col">
								<NavLink
									to="/portal"
									className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest`}
									activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
								>
									{open ? (
										'Portal'
									) : (
										<MdWidgets size={30} title="Portal" />
									)}
								</NavLink>
								<NavLink
									to="/dashboard"
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
									activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
								>
									{open ? (
										'Dashboard'
									) : (
										<MdSpaceDashboard
											size={30}
											title="Dashboard"
										/>
									)}
								</NavLink>
								<NavLink
									to="/programs"
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
									activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
								>
									{open ? (
										'Programs'
									) : (
										<BsStack size={30} title="Programs" />
									)}
								</NavLink>
								<NavLink
									to="/assignments"
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
									activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
								>
									{open ? (
										'Assignments'
									) : (
										<BiTask size={30} title="Assignments" />
									)}
								</NavLink>
								<NavLink
									to="/community"
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
									activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
								>
									{open ? (
										'Community'
									) : (
										<MdOutlineExplore
											size={30}
											title="Community"
										/>
									)}
								</NavLink>
								<NavLink
									to="/support"
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
									activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
								>
									{open ? (
										'Your support'
									) : (
										<MdLiveHelp
											size={30}
											title="Your support"
										/>
									)}
								</NavLink>
							</div>

							<div className="flex flex-col w-full">
								<button
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest text-left"
									id="user-menu"
									aria-haspopup="true"
									onClick={openUser}
								>
									<span className="sr-only">
										Open user menu
									</span>
									{open ? (
										'Account'
									) : (
										<img
											className="h-8 w-8 rounded-full"
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											alt=""
										/>
										// <RiUserSettingsLine
										// 	size={30}
										// 	title="Account"
										// />
									)}
								</button>
								<div
									className={`${
										dropdown === true ? 'block' : 'hidden'
									} absolute left-full mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50`}
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="user-menu"
									onMouseOut={() => setDropdown(!dropdown)}
									onMouseLeave={() => setDropdown(!dropdown)}
									on
								>
									<NavLink
										to={
											authenticated === true &&
											`/users/${decoder()}`
										}
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
										role="menuitem"
									>
										Your Profile
									</NavLink>
									<NavLink
										to="/users/logout"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
										role="menuitem"
										onClick={openUser}
									>
										Sign out
									</NavLink>
								</div>
								<NavLink
									to="/sitemap"
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
									activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
								>
									{open ? (
										'Sitemap'
									) : (
										<AiOutlinePartition
											size={30}
											title="Sitemap"
										/>
									)}
								</NavLink>
								<NavLink
									to="users/logout"
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
									activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
								>
									{open ? (
										'Logout'
									) : (
										<RiShutDownLine
											size={30}
											title="Logout"
										/>
									)}
								</NavLink>
							</div>
						</>
					)}
				</div>
			</aside>
		</div>
	)
}
