import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { DiscountModal } from "component";
import ReactPaginate from 'react-paginate';

import {DiscountAPI} from '../../../../api/discount'

import "./Discount.scss";

export function Discount() {
  const [discountData, setdiscountData] = useState([]);
  const [show, setShow] = useState(false);

  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const ITEMS_PER_PAGE = 7;

  useEffect(() => {
    const fetchDiscountData = async () => {
      try {
        const request = await DiscountAPI.list();
        // console.log(request)
        if(request) {
          setdiscountData(request.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchDiscountData();
    return true;
  }, []); 
  useEffect(() => {
    // console.log(discountData.length)
    setPageCount( Math.ceil(discountData.length / ITEMS_PER_PAGE ) );
    // console.log(pageCount)
    handlePageClick({selected: 0});
    setSelectedDiscount( pageData[0] );
    // console.log(selectedDiscount)
  }, [discountData]);

  const [pageData, setPageData] = useState([]);

  const [selectedDiscount, setSelectedDiscount] = useState(null)
  function handleDiscountModal(e,idx) {
    if (typeof idx === "number") {
      setSelectedDiscount( pageData[idx] );
    } else {
      setSelectedDiscount( null );
    }
    handleShow();
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDeleteDiscount(e, index) {
    const ID = pageData[index].id;
    console.log(ID)
    const _delete = async () => {
      try {
        const res = await DiscountAPI.delete(ID);
        // console.log(request)
        if(res) { setdiscountData(discountData.filter((item) => item.id !== ID)) }
      } catch (error) {
        console.error(error);
      }
    }
    _delete();
  }

  function handlePageClick(event) {
    const newOffset = (event.selected * ITEMS_PER_PAGE);
    // console.log(
      // `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);

    const startIdx = newOffset;
    const endIdx = newOffset + ITEMS_PER_PAGE;
    // console.log(startIdx, endIdx)
    setPageData(discountData.slice(startIdx, endIdx))
  }

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="add-table-button">
          <Button variant="primary" onClick={(e) => handleDiscountModal(e)}>
            <AiOutlinePlus /> New 
          </Button>
        </div>
        <div className="table-table">
          <Table striped hover>
            <thead>
              <tr>
                {/* <th>番号</th> */}
                <th>ID</th>
                <th>割引コード</th>
                <th>コード数</th>
                <th>割引額</th>
                <th>最小額</th>
                <th>開始時間</th>
                <th>終了時間</th>
                <th>アクション</th>
              </tr>
            </thead>
            {/*  */}
              { pageData.length > 0 ?
                <tbody>
                  {pageData.map((item, index) => (
                    <tr key={"discount-idx"+index.toString()}>
                      {/* <td>{index}</td> */}
                      <td>{item.id}</td>
                      <td>{item.discount_code}</td>
                      <td>{item.remaining}</td>
                      <td>{item.percentage}</td>
                      <td>{item.minimum}</td>
                      <td>{item.start_time}</td>
                      <td>{item.end_time}</td>
                      <td className="table-action">
                        <button
                          className="update button"
                          onClick={(e) => handleDiscountModal(e, index)}
                        >
                          <AiFillEdit />
                        </button>
                        <button className="delete button"
                          onClick={(e) => handleDeleteDiscount(e, index)}
                        >
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                :
                <tbody><tr><td>No data yet</td></tr></tbody>
              }
          </Table>
        </div>
        {
          <DiscountModal show={show} handleClose={handleClose} discountData={selectedDiscount}/>
        }
      </div>
      <div className="pagination-container">
        {/* <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageLinkClassName="clickable-border"
          previousLinkClassName="clickable-border"
          nextLinkClassName="clickable-border"
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
