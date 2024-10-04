export const getData = () => {
	const employees = [
		{
			id: 1,
			firstName: "Bethany",
			lastName: "Williams",
			avatar: "./assets/avatars/avatar04.png",
			position: 1,
		},
		{
			id: 2,
			firstName: "Alice",
			lastName: "Smith",
			avatar: "",
			position: 2,
		},
		{
			id: 3,
			firstName: "John",
			lastName: "Doe",
			avatar: "./assets/avatars/avatar09.png",
			position: 3,
		},
		{
			id: 4,
			firstName: "Mary",
			lastName: "Johnson",
			avatar: "./assets/avatars/avatar06.png",
			position: 4,
		},
		{
			id: 5,
			firstName: "Martha",
			lastName: "Cooper",
			avatar: "./assets/avatars/avatar05.png",
			position: 5,
		},
		{
			id: 6,
			firstName: "Daniel",
			lastName: "Clark",
			avatar: "./assets/avatars/avatar01.png",
			position: 6,
		},
		{
			id: 7,
			firstName: "Laura",
			lastName: "Turner",
			avatar: "./assets/avatars/avatar07.png",
			position: 7,
		},
		{
			id: 8,
			firstName: "Mary",
			lastName: "Turner",
			avatar: "./assets/avatars/avatar10.png",
			position: 8,
		},
	];

	const positions = [
		{
			id: 1,
			name: "Database Analyst",
		},
		{
			id: 2,
			name: "Web Developer",
		},
		{
			id: 3,
			name: "Cyber Secuirity Specialist",
		},
		{
			id: 4,
			name: "Business Analyst",
		},
		{
			id: 5,
			name: "Tech Support",
		},
		{
			id: 6,
			name: "Database Analyst",
		},
		{
			id: 7,
			name: "Data Scientist",
		},
		{
			id: 8,
			name: "Product Manager",
		},
	];
	const segmentedOptions = [
		{ id: 1, name: "Basic info", icon: "wxi-account" },
		{ id: 2, name: "Security" },
	];

	const location = [
		{ id: 1, name: "On-site" },
		{ id: 2, name: "Hybrid" },
		{ id: 3, name: "Remote" },
	];

	const SVR = [
		{ value: 1, label: "React", name: "React", id: 1 },
		{ value: 2, label: "Svelte", name: "Svelte", id: 2 },
		{ value: 3, label: "Vue", name: "Vue", id: 3 },
	];

	const core = [
		{ value: 1, label: "Calendar" },
		{ value: 2, label: "Input" },
		{ value: 3, label: "Button" },
		{ value: 4, label: "Uploader" },
		{ value: 5, label: "Tabs" },
		{ value: 6, label: "Notice" },
		{ value: 7, label: "Timepicker" },
		{ value: 8, label: "Slider" },
	];

	const countries = [
		{ id: 1, name: "Poland" },
		{ id: 2, name: "Germany" },
		{ id: 3, name: "United Stated" },
		{ id: 4, name: "Great Britain" },
		{ id: 5, name: "France" },
		{ id: 6, name: "Italy" },
	];

	return {
		employees,
		positions,
		segmentedOptions,
		location,
		SVR,
		core,
		countries,
	};
};
