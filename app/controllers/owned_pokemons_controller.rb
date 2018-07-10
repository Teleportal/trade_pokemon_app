class OwnedPokemonsController < ApplicationController
  before_action :set_owned_pokemon, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user, only: [:index]

  # GET /owned_pokemons
  # GET /owned_pokemons.json
  def index
    @owned_pokemons = current_user.owned_pokemons
  end

  # GET /owned_pokemons/1
  # GET /owned_pokemons/1.json
  def show
  end

  # GET /owned_pokemons/new
  def new
    @owned_pokemon = OwnedPokemon.new
  end

  # GET /owned_pokemons/1/edit
  def edit
  end

  # POST /owned_pokemons
  # POST /owned_pokemons.json
  def create
    @owned_pokemon = OwnedPokemon.new(owned_pokemon_params)

    respond_to do |format|
      if @owned_pokemon.save
        format.html { redirect_to @owned_pokemon, notice: 'Owned pokemon was successfully created.' }
        format.json { render :show, status: :created, location: @owned_pokemon }
      else
        format.html { render :new }
        format.json { render json: @owned_pokemon.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /owned_pokemons/1
  # PATCH/PUT /owned_pokemons/1.json
  def update
    respond_to do |format|
      if @owned_pokemon.update(owned_pokemon_params)
        format.html { redirect_to @owned_pokemon, notice: 'Owned pokemon was successfully updated.' }
        format.json { render :show, status: :ok, location: @owned_pokemon }
      else
        format.html { render :edit }
        format.json { render json: @owned_pokemon.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /owned_pokemons/1
  # DELETE /owned_pokemons/1.json
  def destroy
    @owned_pokemon.destroy
    respond_to do |format|
      format.html { redirect_to owned_pokemons_url, notice: 'Owned pokemon was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_owned_pokemon
      @owned_pokemon = OwnedPokemon.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def owned_pokemon_params
      params.require(:owned_pokemon).permit(:user_id, :nickname, :combat_power, :pokemon_id)
    end
end
