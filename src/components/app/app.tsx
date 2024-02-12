import MainScreen from '../../pages/main-screen/main-screen';

type AppComponentProps = {
  placesCount: number;
}

function App({placesCount}: AppComponentProps): JSX.Element {
  return <MainScreen placesCount={placesCount} />;
}

export default App;
