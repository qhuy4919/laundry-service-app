import React, { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import {DiscountAPI} from '../../api/discount'

export function DiscountModal(props) {
  const { show, handleClose, discountData } = props;
  const { register, setValue, handleSubmit, reset } = useForm();
  // 
  const onSubmitForm = async (data) => {
    try {
      if (data.id === undefined) 
        if (discountData) {
          data.id = discountData.id;
          if (isNaN(parseInt(data.id))) throw ("ID must be an integer")
          data.id = parseInt(data.id)
        }
      
      if (!data.discount_code) {
        throw ("Please input Discount Code");
      }

      if (!isNaN(parseInt(data.remaining))) {
        data.remaining = parseInt(data.remaining)
        if (data.remaining < 0) {
          throw ("Remaining must be non-negative");
        }
      } else {
        throw ("Remaining must be an integer");
      }
      
      if (!isNaN( parseFloat(data.percentage) )) {
        data.percentage = parseFloat(data.percentage)
      } else throw ("Discount percentage must be a valid Real number")
      if (data.percentage <= 0 || 1 < data.percentage) {
        throw ("Discount percentage must be greater than Zero and not greater than 1")
      }

      if (!isNaN(data.minimum)) {
        data.minimum = parseFloat(data.minimum)
      } else throw ("Discount minimum must be a valid Real number")
      if (data.minimum < 0) {
        throw ("Discount percentage must be in non-negative")
      }

      const stdate = new Date(data.start_time)
      const endate = new Date(data.end_time)
      if (isNaN(stdate)) {
        throw ("Start Time must be a valid timestamp, in format YYYY-MM-DD HH:mm:ss")
      }
      if (isNaN(endate)) {
        throw ("End Time must be a valid timestamp, in format YYYY-MM-DD HH:mm:ss")
      }
      if (stdate.getTime() >= endate.getTime()) {
        throw ("Start Time must be before End Time")
      }
    } catch (err) {
      alert(err);
      return false;
    }

    const mode = (discountData ? "update" : "create");
    if (mode === "update") {
      // alert(JSON.stringify(data))
      // const res = "1";
      const res = await DiscountAPI.update(JSON.stringify(data));
      if (res) {
        alert("Update successful");
      } else {
        alert("Something went wrong");
      }
    } else {
      const res = await DiscountAPI.create(JSON.stringify(data));
      if (res) {
        alert("Created");
      } else {
        alert("Something went wrong");
      }
    }
  }
  useEffect(() => {
    reset(discountData);
  }, [discountData])
  // console.log(discountData);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {discountData ? "Editting Coupon" : "Creating Coupon"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="discount-form" onSubmit={handleSubmit(onSubmitForm)}>
            {/*  */}
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text" placeholder="Auto" defaultValue={discountData ? discountData.id : ""} {...register("id")} disabled
              />
            </Form.Group>
            {/*  */}
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>割引コード</Form.Label>
              <Form.Control
                type="text" placeholder="None"
                defaultValue={discountData ? discountData.discount_code : ""} {...register("discount_code")}
                required
              />
            </Form.Group>
          </Form>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>コード数</Form.Label>
            <Form.Control
              type="number" placeholder="0"
              defaultValue={discountData ? discountData.remaining : ""}
              {...register("remaining")}
              required
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>割引額</Form.Label>
            <Form.Control
              type="text" placeholder="eg. 0.15 (from 0.0-1.0)"
              defaultValue={discountData ? (parseFloat(discountData.percentage)*100).toFixed(2) : ""}
              {...register("percentage")}
              required
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>最小額</Form.Label>
            <Form.Control
              type="text"
              placeholder="eg. 15000"
              defaultValue={discountData ? discountData.minimum : ""}
              {...register("minimum")}
              required
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>開始時間</Form.Label>
            <Form.Control
              type="text"
              placeholder="eg. 2020-12-21 07:00:00"
              defaultValue={discountData ? discountData.start_time : ""}
              {...register("start_time")}
              required
            />
            <Form.Label>終了時間</Form.Label>
            <Form.Control
              type="text"
              placeholder="eg. 2020-12-21 09:00:00"
              defaultValue={discountData ? discountData.end_time : ""}
              {...register("end_time")}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={handleClose}
            form="discount-form"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
