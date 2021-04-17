import React from "react";

class Nutrition extends React.Component {
    render() {
        // const { url } = this.props.match
        return (
            <div>
                <div className="flex justify-center items-center max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200">
                    <div class="w-full flex-1 hidden md:block mr-4">
                        <div class="relative">
                            <img
                                src={
                                    this.props.ingredient.image.png
                                        ? this.props.ingredient.image.png
                                        : "https://pat-cooney.com/app/themes/juicy/assets/images/lime.png"
                                }
                                class="w-full relative z-10"
                                alt=""
                            />
                            <div
                                style={{
                                    borderColor: this.props.ingredient.color
                                        .hex,
                                }}
                                class="product border-4 absolute z-0"
                            ></div>
                        </div>
                    </div>
                    <div className="p-1 border-2 border-black font-sans w-72">
                        <div className="text-4xl mb-4 font-gotham-bold leading-none">
                            Nutrition Facts
                        </div>
                        <div className="flex justify-between font-gotham-bold border-b-8 border-black">
                            <div>Serving size</div>
                            <div>Standard (100g)</div>
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
                                    {` ${
                                        this.props.ingredient.nutrition.fat
                                            ? `${this.props.ingredient.nutrition.fat}g`
                                            : ``
                                    }`}
                                </div>
                                <div className="font-gotham-bold">
                                    {(
                                        (this.props.ingredient.nutrition.fat /
                                            78) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="pl-4 flex justify-between">
                                <div>
                                    Saturated Fat
                                    {` ${
                                        this.props.ingredient.nutrition
                                            .saturated_fat
                                            ? `${this.props.ingredient.nutrition.saturated_fat}g`
                                            : `0g`
                                    }`}
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
                                    </span>{" "}
                                    {` ${
                                        this.props.ingredient.nutrition
                                            .cholesterol
                                            ? `${this.props.ingredient.nutrition.cholesterol}mg`
                                            : `0mg`
                                    }`}
                                </div>
                                <div className="font-gotham-bold">
                                    {this.props.ingredient.nutrition.cholesterol
                                        ? (
                                              (this.props.ingredient.nutrition
                                                  .cholesterol /
                                                  300) *
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
                                        Sodium
                                    </span>{" "}
                                    {` ${
                                        this.props.ingredient.nutrition.sodium
                                            ? `${this.props.ingredient.nutrition.sodium}mg`
                                            : `0mg`
                                    }`}
                                </div>
                                <div className="font-gotham-bold">7%</div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="flex justify-between">
                                <div>
                                    <span className="font-gotham-bold">
                                        Total Carbohydrate
                                    </span>{" "}
                                    {` ${
                                        this.props.ingredient.nutrition.carbs
                                            ? `${this.props.ingredient.nutrition.carbs}g`
                                            : `0g`
                                    }`}
                                </div>
                                <div className="font-gotham-bold">
                                    {this.props.ingredient.nutrition.carbs
                                        ? (
                                              (this.props.ingredient.nutrition
                                                  .carbs /
                                                  300) *
                                              100
                                          ).toFixed(1)
                                        : 0}
                                    %
                                </div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="flex justify-between">
                                <div className="pl-4">Dietary Fiber 4g</div>
                                <div className="font-gotham-bold">14%</div>
                            </div>
                            <hr className="border-black-200" />
                            <div className="pl-4">
                                Total Sugar 12g
                                <div className="pl-4">
                                    <hr className="border-black-200" />
                                    <div className="flex justify-between">
                                        <div>Includes 10g Added Sugars</div>
                                        <div className="font-gotham-bold">
                                            20%
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-black-200" />
                            <div>
                                <span className="font-gotham-bold">
                                    Protein
                                </span>{" "}
                                3g
                            </div>
                        </div>
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
            </div>
        );
    }
}
export default Nutrition;
