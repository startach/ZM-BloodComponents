import React from 'react'
import Button from '../button/button'

export default function BookTaxi() {
    return (
        <div>
            <div className="my-3">
                I need a ride from <select><option>select</option></select>
            </div>

            <div className="my-3">
                Pickup Time <select><option>select</option></select>
            </div>

            <div className="my-3">
                I need a ride back to <select><option>select</option></select>
            </div>
            <div className="my-3">
                Pickup Time: XX:XX
            </div>

            <div className="my-3">
                <Button text="Finish"></Button>
            </div>
        </div>
    )
}
