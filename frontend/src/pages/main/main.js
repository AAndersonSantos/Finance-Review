import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import TotalValue from '../../components/value-total/valueTotal'
import swal from 'sweetalert'
import { format } from 'date-fns'
import ReactPaginate from 'react-paginate';
import SideBar from '../../components/sideBar/sideBar';
import * as FaIcons from 'react-icons/fa';
import "./main.css"

function Main() {

    const page = 7;

    const [currentItems, setCurrentItems] = useState(0);
    const [posts, setPosts] = useState([]);

    let navigate = useNavigate()

    useEffect(() => {
        axios.get("https://financereview.herokuapp.com/lista-de-valores").then((res) => {
            if (localStorage.usertoken) {
                setPosts(res.data)
            }
        }).catch((err) => {
            console.log(err.response)
        })

    }, [])

    function deletePost(id) {

        swal({
            title: "Você tem certeza?",
            icon: "warning",
            buttons: ["Cancelar", "Sim, quero deletar!"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    if (localStorage.usertoken) {
                    axios.delete(`https://financereview.herokuapp.com/deletar/${id}`).then((response) => {
                            setPosts(posts.filter(post => post.id !== id))
                            console.log(response);
                            swal("Deletado com sucesso!", {
                                icon: "success",
                            });
                        }).catch((err) => {
                            console.log(err.response)
                        })
                    }
                }
            });
    }

    useEffect(() => {
        if (!localStorage.usertoken) {
            navigate(`/login`)
        }
    })

    useEffect(() => {
        document.body.style.backgroundColor = "#d3dfe1"
        document.body.style.overflowX = "hidden"
        
    })

    function handlePageClick({ selected: selectedPage }) {
        setCurrentItems(selectedPage)
    }

    const offset = currentItems * page

    function renderTable() {
        return (
            <table className="table table-light table-hover">
                <thead>
                    <tr>
                        <th scope="col">Valor</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Data</th>
                        <th scope="col">Editar/Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    function renderRows() {
        return posts.slice(offset, offset + page).map((post, key) => {
            return (
                <tr className='app' key={key}>

                    <td>{new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(post.cash_value / 100)}</td>
                    <td>{post.description}</td>
                    <td>{format(new Date(post.updatedAt), "dd/MM/yyyy")}</td>

                    <td>
                        <Link to={{ pathname: `/editar/${post.id}` }}>
                            <button className="fa-10 btn btn-warning"><FaIcons.FaEdit/></button>
                        </Link>

                        <button className='btn btn-danger' onClick={() => deletePost(post.id)}><FaIcons.FaTrashAlt/></button>
                    </td>

                </tr>
            )
        })
    }

    const pageCount = Math.ceil(posts.length / page)

    return (
        <div className="container-main">

            < SideBar />

            <div className='value-total'>
                <h1>Total</h1>
                <span>< TotalValue /></span>
            </div>

            {renderTable()}

            <ReactPaginate
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                previousLabel="< Anterior"
                pageRangeDisplayed={2}
                nextLabel="Próximo >"
                pageCount={pageCount}
                onPageChange={handlePageClick}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                renderOnZeroPageCount={null}
            />

        </div>
    )
}

export default Main

