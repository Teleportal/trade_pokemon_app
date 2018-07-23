class DesiredPokemonsController < ApplicationController
  before_action :set_desired_pokemon, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user, only: [:index]
  skip_before_action :verify_authenticity_token, :only => [:create]

  # GET /desired_pokemons
  # GET /desired_pokemons.json
  def index
    @desired_pokemons = current_user.desired_pokemons
  end

  # GET /desired_pokemons/1
  # GET /desired_pokemons/1.json
  def show
  end

  # GET /desired_pokemons/new
  def new
    @desired_pokemon = DesiredPokemon.new
  end

  # GET /desired_pokemons/1/edit
  def edit
  end

  # POST /desired_pokemons
  # POST /desired_pokemons.json
  def create
    puts 'It is in create'
    puts "params #{desired_pokemon_params}"
    
    parameters = desired_pokemon_params.merge!(user_id: current_user.id)

    @desired_pokemon = DesiredPokemon.new(parameters)

    respond_to do |format|
      if @desired_pokemon.save
        format.html { redirect_to @desired_pokemon, notice: 'Desired pokemon was successfully created.' }
        format.json { render :show, status: :created, location: @desired_pokemon }
      else
        format.html { render :new }
        format.json { render json: @desired_pokemon.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /desired_pokemons/1
  # PATCH/PUT /desired_pokemons/1.json
  def update
    respond_to do |format|
      if @desired_pokemon.update(desired_pokemon_params)
        format.html { redirect_to @desired_pokemon, notice: 'Desired pokemon was successfully updated.' }
        format.json { render :show, status: :ok, location: @desired_pokemon }
      else
        format.html { render :edit }
        format.json { render json: @desired_pokemon.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /desired_pokemons/1
  # DELETE /desired_pokemons/1.json
  def destroy
    @desired_pokemon.destroy
    respond_to do |format|
      format.html { redirect_to desired_pokemons_url, notice: 'Desired pokemon was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_desired_pokemon
      @desired_pokemon = DesiredPokemon.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def desired_pokemon_params
      params.require(:desired_pokemon).permit(:user_id, :pokemon_id, :min_cp)
    end
end
