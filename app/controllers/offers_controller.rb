class OffersController < ApplicationController
  before_action :set_offer, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token, :only => [:create]

  # GET /offers
  # GET /offers.json
  def index
    @offers = Offer.all
  end

  # GET /offers/1
  # GET /offers/1.json
  def show
  end

  # GET /offers/new
  def new
    @offer = Offer.new
  end

  # GET /offers/1/edit
  def edit
  end

  # POST /offers
  # POST /offers.json
  def create

    p offer_params

    @offer = Offer.new({status: offer_params[:status]})
    offer_save = @offer.save

    if offer_save
      p offer_params['owned_pokemon_id_1']

      @offered_pokemon_1 = OfferedPokemon.new({
        offer_id: @offer.id,
        owned_pokemon_id: offer_params['owned_pokemon_id_1'],
      })
      offered_pokemon_1_save = @offered_pokemon_1.save

      p offer_params['owned_pokemon_id_2']
      @offered_pokemon_2 = OfferedPokemon.new({
        offer_id: @offer.id,
        owned_pokemon_id: offer_params['owned_pokemon_id_2'],
      })
      offered_pokemon_2_save = @offered_pokemon_2.save


      
    end
    

    




    respond_to do |format|
      if  offer_save && offered_pokemon_1_save && offered_pokemon_2_save
        # format.html { redirect_to @offer, notice: 'Offer was successfully created.' }
        format.json { render :show, status: :created, location: @offer }
      else
        puts "#{@offer.save} && #{@offered_pokemon_1.save} && #{@offered_pokemon_2.save}"
        # format.html { render :new }
        # format.json { render json: @offer.errors, status: :unprocessable_entity }
      end
    end

  end

  # PATCH/PUT /offers/1
  # PATCH/PUT /offers/1.json
  def update
    respond_to do |format|
      if @offer.update(offer_params)
        format.html { redirect_to @offer, notice: 'Offer was successfully updated.' }
        format.json { render :show, status: :ok, location: @offer }
      else
        format.html { render :edit }
        format.json { render json: @offer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /offers/1
  # DELETE /offers/1.json
  def destroy
    @offer.destroy
    respond_to do |format|
      format.html { redirect_to offers_url, notice: 'Offer was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_offer
      @offer = Offer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def offer_params
      params.permit(:owned_pokemon_id_1, :owned_pokemon_id_2, :status, :format, :offer)
    end
end
