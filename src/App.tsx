import React, {useState} from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import {
    Button, Checkbox,
    Container, FormControlLabel,
    Grid,
    Icon,
    Paper, Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Person {
    name: string,
    score: number,
    isActive: boolean
}

function App() {

    const [activeUser, setActiveUser] = useState<number>(0)
    const [input, setInput] = useState<string>("0")
    const [editMode, setEditMode] = useState<boolean>(true)

    const [user, setUsers] = useState<Person[]>([
        // {name: "kalle larson", score: 0, isActive: false},
        // {name: "martin larson", score: 600, isActive: true},
        // {name: "Lista larson", score: 690, isActive: false},
        // {name: "Lista klason", score: 650, isActive: false}
    ])

    return (
        <div className="App">
            {/*<header className="App-header">*/}
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            {/*<p>*/}
            {/*  Edit <code>src/App.tsx</code> and save to reload.*/}
            {/*</p>*/}
            {/*<a*/}
            {/*  className="App-link"*/}
            {/*  href="https://reactjs.org"*/}
            {/*  target="_blank"*/}
            {/*  rel="noopener noreferrer"*/}
            {/*>*/}
            {/*  Learn React*/}
            {/*</a>*/}
            {/*<Typography variant="h1" component="h2">*/}
            {/*  h1. Heading*/}
            {/*</Typography>*/}

            {/*    <Grid container spacing={2}>*/}
            {/*        <Grid item xs={8}>*/}
            {/*            hej*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</header>*/}
            <main>
                <Container fixed>
                    {/*maxWidth={"md"}*/}
                    <Paper elevation={1}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="space-evenly"
                            alignItems="stretch"
                            spacing={1}
                            sx={{p: 2}}
                        >
                            <Grid item>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Namn</TableCell>
                                            <TableCell align="right">{editMode ? "Radera" : "placering"}</TableCell>
                                            <TableCell align="right">Poäng</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >

                                                <TableCell component="th" scope="row" align={"justify"}>
                                                    {editMode ?
                                                        <TextField value={row.name} onChange={event => {
                                                            const tempUsers = [...user];
                                                            tempUsers[index].name = event.target.value
                                                            setUsers(tempUsers)
                                                        }}/>
                                                        : (index === activeUser ? (<>
                                                            <ArrowForwardIosIcon/> {row.name}</>) : row.name)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {editMode ?
                                                        <>
                                                            <Button onClick={() => {
                                                                const tempUsers = [...user];
                                                                tempUsers.splice(index, 1)
                                                                setActiveUser((activeUser >= user.length - 1 ? 0 : (activeUser + 1)))
                                                                setUsers(tempUsers)
                                                            }}>Delte</Button>
                                                            <FormControlLabel
                                                                label="Aktiv spelare:"
                                                                labelPlacement={"start"}
                                                                control={
                                                                    <Checkbox checked={index === activeUser}
                                                                              onChange={() => setActiveUser(index)}/>
                                                                }/>
                                                        </>
                                                        :
                                                        ([...user].sort((a, b) => a.score - b.score).reverse().findIndex(value => value === row) + 1)}
                                                </TableCell>

                                                <TableCell align="right">
                                                    {editMode ?
                                                        <TextField value={row.score} onChange={event => {
                                                            const tempUsers = [...user];
                                                            tempUsers[index].score = +event.target.value.replace(/\D/g, '')
                                                            setUsers(tempUsers)
                                                        }}/>
                                                        : row.score}
                                                </TableCell>
                                            </TableRow>

                                        ))}

                                        {editMode ? <TableRow key={"add new"}
                                        >
                                            <TableCell>
                                                <Button onClick={() => {
                                                    const tempUsers = [...user];
                                                    tempUsers.push({name: "", score: 0, isActive: false})
                                                    setUsers(tempUsers)
                                                }}>Lägg till ny spelare</Button>
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow> : null}
                                    </TableBody>
                                </Table>
                            </Grid>


                            <Grid container item direction={"column"} justifyContent={"space-between"}>
                                {user[activeUser] && !editMode ?
                                    <Grid
                                        container item
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        spacing={1}
                                        xs={6}
                                    >
                                        <Grid item>
                                            <Typography>{"För " + user[activeUser].name + " skriv in poäng från denna runda:"}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <TextField value={input}
                                                       onChange={event => setInput(event.target.value.length === 0 ? "0" : event.target.value.replace(/\D/g, ''))}></TextField>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                onClick={() => {
                                                    const tempUsers = [...user];
                                                    tempUsers[activeUser].score += (+input)
                                                    setInput("0")
                                                    setUsers(tempUsers)
                                                    setActiveUser((activeUser >= user.length - 1 ? 0 : (activeUser + 1)))
                                                }
                                                }
                                            >Enter</Button>
                                        </Grid>
                                    </Grid>
                                    : null}

                                <Grid item xs={6}>
                                    <FormControlLabel label="Editera" control={
                                        <Switch checked={editMode} value={editMode} onChange={event => setEditMode(event.target.checked)}
                                                name="Editera"/>
                                    }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </main>
        </div>
    );
}

export default App;
