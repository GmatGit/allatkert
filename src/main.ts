import { Animal } from "./animal";
import { BySpecies } from "./byspecies";
import 'bootstrap/dist/css/bootstrap.css';

document.addEventListener('DOMContentLoaded', async () => {
  const animalTable = document.getElementById('animalTable')! as HTMLTableElement;
  const speciesTable = document.getElementById('byspeciesTable')! as HTMLTableElement;
  const newAnimRowTemp = document.getElementById('newAnimRow')! as HTMLTemplateElement;
  const newSpecRowTemp = document.getElementById('newSpecRow')! as HTMLTemplateElement;
  const jelento = document.getElementById('jelento')! as HTMLElement;

  try {
    const animRes = await fetch('http://localhost:3000/animals/');
    const specRes = await fetch('http://localhost:3000/animals/bySpecies');

    if (!animRes.ok || !specRes.ok) {
      jelento.textContent = `HTTP Hiba! 1. backend útvonal: ${animRes.status}, ${animRes.statusText} - 2. backend útvonal: ${specRes.status}, ${specRes.statusText}`;
      return;
    }

    const animContent: Animal[] = await animRes.json();
    const specContent: BySpecies[] = await specRes.json();

    for (const animal of animContent) {
      const newAnimRow = newAnimRowTemp.content.cloneNode(true) as DocumentFragment;
      const id = newAnimRow.querySelector('.ID')! as HTMLElement;
      const name = newAnimRow.querySelector('.NAME')! as HTMLElement;
      const species = newAnimRow.querySelector('.SPECIES')! as HTMLElement;
      const age = newAnimRow.querySelector('.AGE')! as HTMLElement;

      id.textContent = animal.id.toString();
      name.textContent = animal.name;
      species.textContent = animal.species;
      age.textContent = animal.age.toString();

      animalTable.appendChild(newAnimRow);
    }

    for (const species of specContent) {
      const newSpecRow = newSpecRowTemp.content.cloneNode(true) as DocumentFragment;
      const count = newSpecRow.querySelector('.COUNT')! as HTMLElement;
      const spec = newSpecRow.querySelector('.SPECIES')! as HTMLElement;

      count.textContent = species._count.toString();
      spec.textContent = species.species;

      speciesTable.appendChild(newSpecRow);
    }
  } catch (error) {
    jelento.textContent = `Hiba! "${error}"`
  }
});