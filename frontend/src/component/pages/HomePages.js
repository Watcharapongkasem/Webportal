import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import mapDispatchToProps from '../../redux/DispatchToProps'


class HomePages extends Component {  

    render() {
        
        return (
            <div>
                <h1>Hello From HomePages {new URLSearchParams(this.props.location.search).get("username")}</h1>
                <input type="button" onClick={()=> this.props.logout()} value="LogOut"></input>
            </div>
        )
    }
}

export default compose(withRouter,connect(null,mapDispatchToProps))(HomePages)