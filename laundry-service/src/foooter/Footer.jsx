import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div style={{height: '50px', zIndex: 1, position: 'fixed', backgroundColor: '#f7f7f7', width: '100%', bottom: 0, paddingLeft: '28px', border: '1px solid gray', paddingRight:'28px'}}>
                <h5 style={{display:'inline-block'}}>2020 All rights reserved</h5>
                <h5 style={{display:'inline-block',float: 'right'}}>About us</h5>
            </div>
        )
    }
}
