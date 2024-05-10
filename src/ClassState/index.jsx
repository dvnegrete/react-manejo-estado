import { Component } from "react"
import { Loading } from "./Loading";

export class ClassState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            value: "",
        };
    }

    SECURITY_CODE = 'paradigma';

    componentDidMount() {
        console.log("componentDidMount");
    }

    // componentDidCatch() {
    //     console.log("componentDidCatch");
    // }

    componentDidUpdate() {
        if (this.state.loading) {
            console.log(this.state.value);
            setTimeout(() => {
                if (this.state.value === this.SECURITY_CODE) {
                    this.setState({loading: false, error: false})
                } else {
                    this.setState({ loading: false , error: true});
                }
            }, 1500)
        }
    }



    render() {
        // eslint-disable-next-line react/prop-types
        const { name } = this.props;
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor escribe el código de seguridad</p>
                {
                    this.state.error  && (
                        <p>Error: El codigo es incorrecto</p>
                    )
                }
                {
                    this.state.loading && (
                        <Loading />
                    )
                }
                <input
                    type="text"
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={(event)=>{
                        this.setState({value: event.target.value, error: false})
                    }}
                />
                <button onClick={() => this.setState({ loading: true })}>
                    Comprobar
                </button>
            </div>
        )
    }

}