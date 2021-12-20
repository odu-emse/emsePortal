import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { getToken, decoder } from './helpers'

const AppNavbar = () => {
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
			setAuthenticated(true)
		} else {
			setAuthenticated(false)
		}
	}
	useEffect(() => {
		auth()
	}, [authenticated])

	return (
		<>
			<nav className="w-full h-16 bg-gray-800 flex flex-row absolute justify-between pr-6">
				<button
					className="inline-flex items-center justify-center py-2 px-6 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-56 w-auto"
					aria-expanded="false"
					onClick={toggle}
				>
					<span className="sr-only">Open main menu</span>
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
				{authenticated === true && (
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
							<span className="sr-only">View notifications</span>
							<svg
								className="h-6 w-6"
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
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
						</button>
						<div className="ml-3 relative z-10">
							<div>
								<button
									className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
									id="user-menu"
									aria-haspopup="true"
									onClick={openUser}
								>
									<span className="sr-only">
										Open user menu
									</span>
									<img
										className="h-8 w-8 rounded-full"
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
								</button>
							</div>
							<div
								className={`${
									dropdown === true ? 'block' : 'hidden'
								} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="user-menu"
								onMouseOut={() => setDropdown(!dropdown)}
								onMouseLeave={() => setDropdown(!dropdown)}
							>
								<Link
									to={
										authenticated === true &&
										`/users/${decoder()}`
									}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									role="menuitem"
								>
									Your Profile
								</Link>
								<Link
									to="/users/logout"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									role="menuitem"
									onClick={openUser}
								>
									Sign out
								</Link>
							</div>
						</div>
					</div>
				)}
			</nav>
			<div className="nav relative w-4/12 md:w-3/12 lg:w-2/12">
				<aside className="relative w-full flex flex-col bg-gray-800 h-full absolute min-h-screen">
					<div className="logo w-full flex items-center justify-center py-5">
						<img
							className="block lg:hidden h-16 w-auto"
							src="https://www.odu.edu/content/dam/odu/logos/univ/png-72dpi/crown-r-2-color.png"
							alt="Workflow"
						/>
						<img
							className="hidden lg:block h-16 w-auto"
							src="https://www.odu.edu/content/dam/odu/logos/univ/png-72dpi/odu-sig-noidea-fullcolor.png"
							alt="Workflow"
						/>
					</div>
					<div className="menu relative h-full flex flex-col">
						{!authenticated === true ? (
							<>
								<NavLink
									to="/users/login"
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
									activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
								>
									Login
								</NavLink>
								<NavLink
									to="/users/register"
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
									activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
								>
									Register
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
										Portal
									</NavLink>
									<NavLink
										to="/dashboard"
										className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
										activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
									>
										Dashboard
									</NavLink>
									<NavLink
										to="/programs"
										className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
										activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
									>
										Programs
									</NavLink>
									<NavLink
										to="/assignments"
										className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
										activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
									>
										Assignments
									</NavLink>
									<NavLink
										to="/community"
										className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
										activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
									>
										Community
									</NavLink>
									<NavLink
										to="/support"
										className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
										activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
									>
										Your support
									</NavLink>
								</div>
								<div className="flex flex-col absolute bottom-0 w-full">
									<NavLink
										to="/account"
										className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
										activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
									>
										Account
									</NavLink>
									<NavLink
										to="/sitemap"
										className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
										activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
									>
										Sitemap
									</NavLink>
									<NavLink
										to="/logout"
										className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 text-sm font-medium uppercase tracking-widest"
										activeClassName="bg-gray-900 text-white px-3 py-2 text-sm font-medium border-l-4"
									>
										Logout
									</NavLink>
								</div>
							</>
						)}
					</div>
				</aside>
			</div>
		</>
		// <nav className="bg-gray-800 w-56">
		// 	<div className="min-h-screen flex-col overflow-hidden relative">
		// 		<div className="relative flex items-center justify-between flex-col">
		// 			<div className="absolute inset-y-0 right-0 flex items-center sm:hidden flex-col">
		// 				<button
		// 					className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
		// 					aria-expanded="false"
		// 					onClick={toggle}
		// 				>
		// 					<span className="sr-only">Open main menu</span>
		// 					<svg
		// 						className="block h-6 w-6"
		// 						xmlns="http://www.w3.org/2000/svg"
		// 						fill="none"
		// 						viewBox="0 0 24 24"
		// 						stroke="currentColor"
		// 						aria-hidden="true"
		// 					>
		// 						<path
		// 							strokeLinecap="round"
		// 							strokeLinejoin="round"
		// 							strokeWidth="2"
		// 							d="M4 6h16M4 12h16M4 18h16"
		// 						/>
		// 					</svg>
		// 					<svg
		// 						className="hidden h-6 w-6"
		// 						xmlns="http://www.w3.org/2000/svg"
		// 						fill="none"
		// 						viewBox="0 0 24 24"
		// 						stroke="currentColor"
		// 						aria-hidden="true"
		// 					>
		// 						<path
		// 							strokeLinecap="round"
		// 							strokeLinejoin="round"
		// 							strokeWidth="2"
		// 							d="M6 18L18 6M6 6l12 12"
		// 						/>
		// 					</svg>
		// 				</button>
		// 			</div>
		// 			<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start flex-col">
		// 				<div className="flex-shrink-0 flex items-center">
		// 					<img
		// 						className="block lg:hidden h-8 w-auto"
		// 						src="https://www.odu.edu/content/dam/odu/logos/univ/png-72dpi/crown-r-2-color.png"
		// 						alt="Workflow"
		// 					/>
		// 					<img
		// 						className="hidden lg:block h-8 w-auto"
		// 						src="https://www.odu.edu/content/dam/odu/logos/univ/png-72dpi/odu-sig-noidea-fullcolor.png"
		// 						alt="Workflow"
		// 					/>
		// 				</div>
		// 				<div className="hidden sm:block sm:ml-6">
		// 					<div className="flex space-x-4 flex-col">
		// 						{!authenticated === true ? (
		// 							<>
		// 								<NavLink
		// 									to="/users/login"
		// 									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
		// 									activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
		// 								>
		// 									Login
		// 								</NavLink>
		// 								<NavLink
		// 									to="/users/register"
		// 									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
		// 									activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
		// 								>
		// 									Register
		// 								</NavLink>
		// 							</>
		// 						) : (
		// 							<>
		// 								<NavLink
		// 									to="/portal"
		// 									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
		// 									activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
		// 								>
		// 									Portal
		// 								</NavLink>
		// 								<NavLink
		// 									to="/dashboard"
		// 									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
		// 									activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
		// 								>
		// 									Dashboard
		// 								</NavLink>
		// 								<NavLink
		// 									to="/programs"
		// 									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
		// 									activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
		// 								>
		// 									Programs
		// 								</NavLink>
		// 								<NavLink
		// 									to="/assignments"
		// 									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
		// 									activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
		// 								>
		// 									Assignments
		// 								</NavLink>
		// 							</>
		// 						)}
		// 					</div>
		// 				</div>
		// 			</div>
		// 			{authenticated === true && (
		// 				<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
		// 					<button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
		// 						<span className="sr-only">
		// 							View notifications
		// 						</span>
		// 						<svg
		// 							className="h-6 w-6"
		// 							xmlns="http://www.w3.org/2000/svg"
		// 							fill="none"
		// 							viewBox="0 0 24 24"
		// 							stroke="currentColor"
		// 							aria-hidden="true"
		// 						>
		// 							<path
		// 								strokeLinecap="round"
		// 								strokeLinejoin="round"
		// 								strokeWidth="2"
		// 								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
		// 							/>
		// 						</svg>
		// 					</button>
		// 					<div className="ml-3 relative z-10">
		// 						<div>
		// 							<button
		// 								className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
		// 								id="user-menu"
		// 								aria-haspopup="true"
		// 								onClick={openUser}
		// 							>
		// 								<span className="sr-only">
		// 									Open user menu
		// 								</span>
		// 								<img
		// 									className="h-8 w-8 rounded-full"
		// 									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		// 									alt=""
		// 								/>
		// 							</button>
		// 						</div>
		// 						<div
		// 							className={`${
		// 								dropdown === true ? 'block' : 'hidden'
		// 							} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
		// 							role="menu"
		// 							aria-orientation="vertical"
		// 							aria-labelledby="user-menu"
		// 						>
		// 							<Link
		// 								to={
		// 									authenticated === true &&
		// 									`/users/${decoder()}`
		// 								}
		// 								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
		// 								role="menuitem"
		// 							>
		// 								Your Profile
		// 							</Link>
		// 							<Link
		// 								to="/users/logout"
		// 								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
		// 								role="menuitem"
		// 								onClick={openUser}
		// 							>
		// 								Sign out
		// 							</Link>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			)}
		// 		</div>
		// 	</div>
		// 	<div className={`${open === true ? 'block' : 'hidden'} sm:hidden`}>
		// 		<div className="px-2 pt-2 pb-3 space-y-1 flex-col">
		// 			{authenticated === true ? (
		// 				<>
		// 					<NavLink
		// 						to="/portal"
		// 						className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
		// 						activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
		// 					>
		// 						Portal
		// 					</NavLink>
		// 					<NavLink
		// 						to="/dashboard"
		// 						className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
		// 						activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
		// 					>
		// 						Dashboard
		// 					</NavLink>
		// 					<NavLink
		// 						to="/programs"
		// 						className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
		// 						activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
		// 					>
		// 						Programs
		// 					</NavLink>
		// 					<NavLink
		// 						to="/assignments"
		// 						className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
		// 						activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
		// 					>
		// 						Assignments
		// 					</NavLink>
		// 				</>
		// 			) : (
		// 				<>
		// 					<NavLink
		// 						to="/users/login"
		// 						className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
		// 						activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
		// 					>
		// 						Login
		// 					</NavLink>
		// 					<NavLink
		// 						to="/users/register"
		// 						className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
		// 						activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
		// 					>
		// 						Register
		// 					</NavLink>
		// 				</>
		// 			)}
		// 		</div>
		// 	</div>
		// </nav>
	)
}

export default AppNavbar
