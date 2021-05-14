import React from 'react'

const formatNutrition = (sizeModifier, ingredient, measure, dailyvalue) => {
    if (!dailyvalue) {
        return ` ${(ingredient * 1).toFixed(2)}${measure}`
        // return ` ${ingredient}${measure}`
    } else {
        return ` ${((ingredient / dailyvalue) * 100).toFixed(1)}%`
    }
}

class Nutrition extends React.Component {
    render() {
        // const { url } = this.props.match
        let nutritionSize = 100

        return (
            <div>
                <div className="flex justify-center items-center max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200">
                    <div className="p-1 border-2 border-black font-sans w-72">
                        <div className="text-4xl mb-4 font-gotham-bold leading-none">
                            Nutrition Facts
                        </div>
                        <div className="flex justify-between font-gotham-bold border-b-8 border-black">
                            <div>Serving size</div>
                            <div>Standard ({nutritionSize}g)</div>
                        </div>
                        <div className="font-gotham-bold">
                            Amount per serving
                        </div>
                        <hr className="border-black-200"></hr>
                        <div>
                            <span className="font-gotham-bold">Calories</span>
                            {` ${
                                this.props.ingredient.nutrition.calories
                                    ? `${this.props.ingredient.nutrition.calories}`
                                    : ``
                            }`}
                        </div>

                        <div className="border-t-4 border-black text-sm pb-1">
                            <div className="text-right font-gotham-bold pt-1 pb-1">
                                % Daily value*
                            </div>
                            <hr className="border-black-200" />
                            <div className="flex justify-between">
                                <div>
                                    <span className="font-gotham-bold">
                                        Total Fat
                                    </span>
                                    {this.props.ingredient.nutrition.fat &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition.fat,
                                            'g'
                                        )}
                                </div>
                                <div className="font-gotham-bold">
                                    {this.props.ingredient.nutrition.fat &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition.fat,
                                            '%',
                                            78
                                        )}
                                </div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="pl-4 flex justify-between">
                                <div>
                                    Saturated Fat
                                    {this.props.ingredient.nutrition
                                        .saturated_fat &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .saturated_fat,
                                            'g'
                                        )}
                                </div>
                                <div className="font-gotham-bold">
                                    {this.props.ingredient.nutrition
                                        .saturated_fat
                                        ? (
                                              (this.props.ingredient.nutrition
                                                  .saturated_fat /
                                                  20) *
                                              100
                                          ).toFixed(1)
                                        : 0}
                                    %
                                </div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="flex justify-between">
                                <div>
                                    <span className="font-gotham-bold">
                                        Cholesterol
                                    </span>
                                    {this.props.ingredient.nutrition
                                        .cholesterol &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .cholesterol,
                                            'mg'
                                        )}
                                </div>
                                <div className="font-gotham-bold">
                                    {this.props.ingredient.nutrition
                                        .cholesterol &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .cholesterol,
                                            '%',
                                            300
                                        )}
                                </div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="flex justify-between">
                                <div>
                                    <span className="font-gotham-bold">
                                        Sodium
                                    </span>
                                    {this.props.ingredient.nutrition.sodium &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .sodium,
                                            'mg'
                                        )}
                                </div>
                                <div className="font-gotham-bold">
                                    {this.props.ingredient.nutrition.sodium &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .sodium,
                                            '%',
                                            2300
                                        )}
                                </div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="flex justify-between">
                                <div>
                                    <span className="font-gotham-bold">
                                        Total Carbohydrate
                                    </span>
                                    {this.props.ingredient.nutrition.carbs &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .carbs,
                                            'g'
                                        )}
                                </div>
                                <div className="font-gotham-bold">
                                    {this.props.ingredient.nutrition.carbs &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .carbs,
                                            '%',
                                            275
                                        )}
                                </div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="flex justify-between">
                                <div className="pl-4">
                                    Dietary Fiber
                                    {this.props.ingredient.nutrition.fiber &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .fiber,
                                            'g'
                                        )}
                                </div>
                                <div className="font-gotham-bold">
                                    {this.props.ingredient.nutrition.fiber &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .fiber,
                                            '%',
                                            28
                                        )}
                                </div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="flex justify-between">
                                <div className="pl-4">
                                    Total Sugar
                                    {this.props.ingredient.nutrition.sugar &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .sugar,
                                            'g'
                                        )}
                                </div>
                                <div className="font-gotham-bold">
                                    {this.props.ingredient.nutrition.sugar &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .sugar,
                                            '%',
                                            50
                                        )}
                                </div>
                            </div>
                            <hr className="border-black-200" />  
                            <div className="flex justify-between">
                                <div>
                                    <span className="font-gotham-bold">
                                        Protein
                                    </span>
                                    {this.props.ingredient.nutrition.protein &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .protein,
                                            'g'
                                        )}
                                </div>
                                <div className="font-gotham-bold">
                                    {this.props.ingredient.nutrition.protein &&
                                        formatNutrition(
                                            nutritionSize,
                                            this.props.ingredient.nutrition
                                                .protein,
                                            '%',
                                            50
                                        )}
                                </div>
                            </div>
                        </div>
                        {/* ENDED HERE */}
                        <div className="border-t-8 border-black pt-1 text-sm">
                            <div className="flex justify-between">
                                <div>Vitamin D 2mcg</div>
                                <div>10%</div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="flex justify-between">
                                <div>Calcium 260mg</div>
                                <div>20%</div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="flex justify-between">
                                <div>Iron 8mg</div>
                                <div>45%</div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="flex justify-between">
                                <div>Potassium 240mg</div>
                                <div>6%</div>
                            </div>
                            <div className="border-t-4 border-black flex leading-none text-xs pt-2 pb-1">
                                <div className="pr-1">*</div>
                                <div>
                                    The % Daily Value (DV) tells you how much a
                                    nutrient in a serving of food contributes to
                                    a daily diet. 2,000 calories a day is used
                                    for general nutrition advice.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a
                    className="block text-center mt-2"
                    href="https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels"
                >
                    nutrition numbers
                </a>
                <a
                    className="block text-center mt-2"
                    href="https://www.nutritionvalue.org/Oats%2C_raw_nutritional_value.html"
                >
                    nutrition csvv
                </a>
            </div>
        )
    }
}
export default Nutrition
