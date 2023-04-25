import { useState, useEffect } from "react";

export function Countdown() {
	let [targetSeconds, setTargetSeconds] = useState(null);
	let [elapsedSeconds, setElapsedSeconds] = useState(0);
	useEffect(
		function () {
			if (targetSeconds === null) return;

			setElapsedSeconds(0);
			let interval = setInterval(function () {
				setElapsedSeconds((elapsedSeconds) => elapsedSeconds + 1);
			}, 1000);
			return () => {
				clearInterval(interval);
			};
		},
		[targetSeconds]
	);

	function parseForm(e) {
		e.preventDefault();
		let seconds = e.target.seconds.value;
		setTargetSeconds(parseInt(seconds));
	}
	if (elapsedSeconds >= targetSeconds && targetSeconds !== null) {
		return (
			<>
				<p>¡Terminó el conteo!</p>
				<button onClick={() => setTargetSeconds(null)}>Reiniciar</button>
			</>
		);
	}

	if (targetSeconds !== null) {
		return <p>Faltan {targetSeconds - elapsedSeconds} segundos</p>;
	}

	return (
		<>
			<p>¿Cuántos segundos quieres contar?</p>
			<form action='#' onSubmit={(e) => parseForm(e)}>
				<input type='number' name='seconds' />
				<button>Iniciar</button>
			</form>
		</>
	);
}
