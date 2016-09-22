import React, { Component } from 'react'

class MainContainer extends Component {
    render () {
        return (
            <div>
            <div>Main Container</div>
               <div>
                        {this.props.children}
                    </div>
            </div>
        )
    }
}

export default MainContainer;