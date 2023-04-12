import ListSensors from './ListSensors';
import NewSensor from './NewSensor';

export default function IndexSensors () {
    return (
        <div>
            <h1>Listagem Geral de Sensores</h1>
            <div>
                <ListSensors />
            </div>
            <div>
                <NewSensor />
            </div>
        </div>
    )
}