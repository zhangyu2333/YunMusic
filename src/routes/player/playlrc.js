import React, { Component } from 'react';
import styles from './player.scss';
class Playlrc extends Component {
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }
    hideImg(){
        
        this.setState({
            showLRC:true,
        },() => {
            this.setState({
                height:this.refs.scroll.offsetHeight/2-37.5
            })
        })
    }
    render() {
        let {
            Ht,
            LRC
        } = this.props;
        return (
            <div className={styles.scroll} ref="scroll">
                <ul style={{top:Ht+'px'}}>
                    {
                        LRC.length > 0 && LRC.map((v,i) => {
                            return <li key={i}>
                                {v[1]}
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Playlrc;