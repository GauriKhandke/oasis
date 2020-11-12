import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '70ch',
		},
	},
}));

export default function BasicTextFields() {
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete="on">
			<TextField label="Title" variant="outlined" />
		</form>
	);
}
