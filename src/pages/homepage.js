import React, {Component} from "react";
import Axios from "axios";
import CarouselComponent from '../components/carousel';

const uri = 'http://localhost:6996'

class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dbSlider: [],
        }
    }

    componentDidMount() {
        // console.log("mulai cdm")
        this.getSlider();
    }

    getSlider = () => {
        Axios.get(uri + '/slider')
            .then( (x)=> {
                    // console.log("Data: ",x.data);
                    this.setState({
                        dbSlider: x.data
                    })
                }
            )
            .catch( (err) => {
                console.log("Error: ", err)
        });
    }

    render() {
        // console.log("mulai render")
        // console.log("data state dbSlider :",this.state.dbSlider)
        return(
            <div style={{overflow: "hidden"}}>
                <CarouselComponent dataSlider={this.state.dbSlider} />
            </div>
        )
    }
}

export default HomePage;
