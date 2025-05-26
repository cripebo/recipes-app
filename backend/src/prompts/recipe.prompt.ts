export const buildRecipePrompt = (ingredients: string[]): string => {
  return `
Tengo los siguientes ingredientes: ${ingredients.join(", ")}.

Antes de crear la receta, revisa la lista de ingredientes y excluye cualquier ingrediente que no sea comestible, seguro o adecuado para la alimentación humana. No menciones ni uses esos ingredientes excluidos en la receta.

Quiero que actúes como un chef profesional y nutricionista. Crea una receta sencilla, sabrosa y saludable que use exclusivamente esos ingredientes, salvo agua, sal y pimienta que puedes añadir libremente.

La receta debe incluir:

Cantidades aproximadas para cada ingrediente, expresadas en unidades fáciles (gramos, tazas, cucharadas, unidades).

Instrucciones claras, simples y secuenciales para que cualquier persona pueda seguirlas sin dificultad, usando técnicas de cocina básicas o ligeramente avanzadas (como horneado o salteado).

Tiempo estimado de preparación y de cocción para planificar el proceso.

Un resumen básico con el aporte nutricional estimado (calorías, proteínas, carbohidratos y grasas) para la receta completa.

La receta debe ser práctica, sin complicaciones innecesarias, ideal para personas con poca experiencia en cocina.
`;
};
