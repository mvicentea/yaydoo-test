import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Image from 'next/image'
import uniqueId from "../../utils/uniqueId"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: '900px',
	},
});

export default function DataTable({ rows = [], columns = [], editFun, deleteFun }) {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const rowLen = columns.length;
	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead >
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={uniqueId()}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody >
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={uniqueId()}>
									{columns.map((column, i) => {
										let lastOne = rowLen - 2 === i ? true : false;
										const value = row[column.id];
										const imagecontent = column.hasOwnProperty('image');
										const image = !imagecontent ? false : column.image ?? false;
										if (!image) {
											return <>
												<TableCell key={uniqueId()} align={column.align}>
													{column.format && typeof value === 'number' ? column.format(value) : value}
												</TableCell>
												{lastOne && <TableCell key={uniqueId()} align={column.align}>
													<DeleteForeverIcon key={uniqueId()} onClick={() => deleteFun(row['_id'])} /> <EditIcon key={uniqueId()} onClick={() => editFun(row['_id'])} />
												</TableCell>}
											</>

										} else {
											return <>
												<TableCell key={uniqueId()} align={column.align}>
													<Image key={uniqueId()} loader={() => value} src={value} width={40} height={40} />
												</TableCell>
												{lastOne && <TableCell key={uniqueId()} align={column.align}>
													<DeleteForeverIcon key={uniqueId()} onClick={() => deleteFun(row['_id'])} /> <EditIcon key={uniqueId()} onClick={() => editFun(row['_id'])} />
												</TableCell>}

											</>
										}

									})}

								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[2, 10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
