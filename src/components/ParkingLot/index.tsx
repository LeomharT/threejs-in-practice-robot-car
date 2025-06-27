import ElectricCars from '../ElectricCars';
import GasCar from '../GasCars';
import ParkingLotBlocks from '../ParkingLotBlocks';
import ParkingLotGround from '../ParkingLotGround';
import { ParkingLotMain } from '../ParkingLotMain';
import ParkingSpaces from '../ParkingSpaces';

export default function ParkingLot() {
	return (
		<group>
			<ParkingSpaces />
			<ParkingLotMain />
			<ParkingLotGround />
			<ParkingLotBlocks />
			<GasCar position-x={-12.1} position-z={0.5} />
			<GasCar position-x={-14.6} position-z={0.5} />
			<ElectricCars />
		</group>
	);
}
