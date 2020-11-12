import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}));

export default function DatePickers() {
	const classes = useStyles();
  const today = ((moment().format('YYYY MM DD')).split(' ')).join('-');

	console.log("today's date is : " + today);
	// 2017-05-24

	return (
		<form className={classes.container} noValidate>
			<TextField
				id="date"
				label="Date"
				type="date"
				variant="outlined"
				defaultValue={today}
				className={classes.textField}
				InputLabelProps={{
					shrink: true,
				}}
			/>
		</form>
	);
}
