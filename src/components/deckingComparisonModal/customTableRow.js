import { StarRateRounded } from '@mui/icons-material'
import React from 'react'

function CustomTableRow() {
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', flexDirection: 'column'
        }}>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div>
                    <h4 style={{ margin: '0.5em' }}>CLEVERDECK<span>&reg;</span></h4>
                </div>
                <div>NEW EXTREME CO-EX</div>
                <div>SUPER TOUGH</div>
            </div>

            <div style={{ width: '100%', display: 'flex', marginTop: '2em' }}>
                <div style={{ width: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div>Price</div>
                    <h3 style={{ margin: 5 }}>$$$</h3>
                </div>
                <div style={{ width: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div>Profile</div>
                    <h3 style={{ margin: 5 }}>$$$</h3>
                </div>
            </div>

            <div style={{ width: '100%', display: 'flex', marginTop: '2em' }}>
                <div style={{ width: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div>Durability</div>
                    <div style={{

                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                        <StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /> <StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} />
                        <StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /> <StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} />
                        <StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} />
                    </div>
                </div>
                <div style={{ width: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div>Colors</div>
                    <h3 style={{ margin: 5 }}>5</h3>
                </div>
            </div>
        </div>
    )
}

export default CustomTableRow