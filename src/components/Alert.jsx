import React from 'react'

export const Alert = (props) => {
  return (
    <div>
        <div className="alert alert-primary text-center" role="alert" style={{height:"60px"}}>
            {props.message}
        </div>
    </div>
  )
}
