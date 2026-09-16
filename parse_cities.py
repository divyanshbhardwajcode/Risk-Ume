import json

data = """
United States:
New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, Austin, San Jose, Jacksonville, Fort Worth, Columbus, Charlotte, Indianapolis, Seattle, Denver, Washington, Boston, Nashville, Portland, Las Vegas, Detroit, Miami, Atlanta, Minneapolis, Raleigh, Tampa, Orlando, Pittsburgh, St Louis, Cincinnati, Kansas City, Cleveland, San Francisco, Sacramento, Baltimore, Salt Lake City

Canada:
Toronto, Montreal, Vancouver, Calgary, Edmonton, Ottawa, Winnipeg, Quebec City, Halifax, Victoria, Saskatoon, Regina

Mexico:
Mexico City, Guadalajara, Monterrey, Puebla, Tijuana, Ciudad Juarez, Leon, Merida, Queretaro, San Luis Potosi, Mexicali, Aguascalientes

Brazil:
Sao Paulo, Rio de Janeiro, Brasilia, Belo Horizonte, Salvador, Fortaleza, Recife, Porto Alegre, Curitiba, Campinas, Goiania, Manaus, Belem, Sao Luis

Argentina:
Buenos Aires, Cordoba, Rosario, Mendoza, La Plata, Mar del Plata, Salta, Santa Fe

Chile:
Santiago, Valparaiso, Concepcion, Antofagasta, Vina del Mar, Temuco

Colombia:
Bogota, Medellin, Cali, Barranquilla, Cartagena, Bucaramanga, Pereira, Manizales

Peru:
Lima, Arequipa, Trujillo, Chiclayo, Piura, Cusco

Uruguay:
Montevideo, Salto, Ciudad de la Costa, Paysandu

Paraguay:
Asuncion, Ciudad del Este, San Lorenzo, Luque

Bolivia:
Santa Cruz de la Sierra, La Paz, Cochabamba, Sucre, Oruro

Ecuador:
Quito, Guayaquil, Cuenca, Santo Domingo, Machala, Manta

Venezuela:
Caracas, Maracaibo, Valencia, Barquisimeto, Maracay, Puerto La Cruz

Costa Rica:
San Jose, Alajuela, Heredia, Cartago, Liberia

Panama:
Panama City, Colon, David, La Chorrera, Santiago de Veraguas

Guatemala:
Guatemala City, Mixco, Villa Nueva, Quetzaltenango, Escuintla

Dominican Republic:
Santo Domingo, Santiago de los Caballeros, La Romana, San Pedro de Macoris, Puerto Plata

Jamaica:
Kingston, Montego Bay, Spanish Town, Portmore, Mandeville

Trinidad and Tobago:
Port of Spain, San Fernando, Chaguanas, Arima, Point Fortin

Cuba:
Havana, Santiago de Cuba, Camaguey, Holguin, Santa Clara

Haiti:
Port-au-Prince, Cap-Haitien, Gonaives, Les Cayes

Bahamas:
Nassau, Freeport, West End

Barbados:
Bridgetown, Speightstown, Oistins

Guyana:
Georgetown, Linden, New Amsterdam

Suriname:
Paramaribo, Lelydorp, Brokopondo

Belize:
Belize City, Belmopan, San Ignacio, Orange Walk Town

United Kingdom:
London, Manchester, Birmingham, Glasgow, Liverpool, Leeds, Edinburgh, Bristol, Sheffield, Cardiff, Belfast, Nottingham, Newcastle upon Tyne, Southampton

Ireland:
Dublin, Cork, Limerick, Galway, Waterford, Kilkenny

France:
Paris, Lyon, Marseille, Toulouse, Bordeaux, Lille, Nice, Nantes, Strasbourg, Montpellier, Rennes, Grenoble, Rouen, Brest, Toulon, Clermont-Ferrand

Germany:
Berlin, Munich, Frankfurt, Hamburg, Cologne, Dusseldorf, Stuttgart, Dortmund, Leipzig, Essen, Bremen, Dresden, Hannover, Nuremberg, Duisburg, Mannheim

Italy:
Rome, Milan, Naples, Turin, Bologna, Florence, Venice, Genoa, Palermo, Bari, Verona, Padua, Brescia

Spain:
Madrid, Barcelona, Valencia, Seville, Bilbao, Malaga, Alicante, Zaragoza, Murcia, Palma, Valladolid, A Coruna, Cordoba, Vigo

Portugal:
Lisbon, Porto, Braga, Coimbra, Aveiro, Funchal

Netherlands:
Amsterdam, Rotterdam, The Hague, Utrecht, Eindhoven, Groningen, Tilburg, Breda, Nijmegen

Belgium:
Brussels, Antwerp, Ghent, Bruges, Leuven, Liege, Charleroi

Switzerland:
Zurich, Geneva, Basel, Bern, Lausanne, Lucerne, Lugano

Austria:
Vienna, Graz, Linz, Salzburg, Innsbruck, Klagenfurt

Poland:
Warsaw, Krakow, Wroclaw, Poznan, Gdansk, Lodz, Katowice, Szczecin, Lublin

Czechia:
Prague, Brno, Ostrava, Plzen, Olomouc, Liberec

Slovakia:
Bratislava, Kosice, Presov, Zilina, Nitra

Hungary:
Budapest, Debrecen, Szeged, Miskolc, Pecs, Gyor

Romania:
Bucharest, Cluj-Napoca, Timisoara, Iasi, Brasov, Constanta, Sibiu, Bacau, Oradea

Bulgaria:
Sofia, Plovdiv, Varna, Burgas, Ruse, Stara Zagora

Greece:
Athens, Thessaloniki, Patras, Heraklion, Larissa, Volos

Croatia:
Zagreb, Split, Rijeka, Osijek, Zadar, Pula

Serbia:
Belgrade, Novi Sad, Nis, Kragujevac, Subotica

Slovenia:
Ljubljana, Maribor, Celje, Kranj

Bosnia and Herzegovina:
Sarajevo, Banja Luka, Tuzla, Mostar, Zenica

North Macedonia:
Skopje, Bitola, Kumanovo, Ohrid

Albania:
Tirana, Durres, Vlore, Shkoder, Fier

Montenegro:
Podgorica, Niksic, Budva, Bar

Kosovo:
Pristina, Prizren, Peja, Ferizaj

Estonia:
Tallinn, Tartu, Narva, Parnu

Latvia:
Riga, Daugavpils, Liepaja, Jelgava

Lithuania:
Vilnius, Kaunas, Klaipeda, Siauliai, Panevezys

Finland:
Helsinki, Espoo, Tampere, Vantaa, Turku, Oulu

Sweden:
Stockholm, Gothenburg, Malmo, Uppsala, Vasteras, Orebro, Linkoping

Norway:
Oslo, Bergen, Trondheim, Stavanger, Drammen, Tromso

Denmark:
Copenhagen, Aarhus, Odense, Aalborg, Esbjerg

Iceland:
Reykjavik, Kopavogur, Hafnarfjordur, Akureyri

Luxembourg:
Luxembourg City, Esch-sur-Alzette, Differdange, Dudelange

Malta:
Valletta, Birkirkara, Sliema, Mosta

Cyprus:
Nicosia, Limassol, Larnaca, Paphos

Ukraine:
Kyiv, Lviv, Odesa, Dnipro, Kharkiv, Zaporizhzhia, Vinnytsia

Moldova:
Chisinau, Balti, Bender, Cahul

Belarus:
Minsk, Gomel, Mogilev, Vitebsk, Grodno

Russia:
Moscow, Saint Petersburg, Novosibirsk, Yekaterinburg, Kazan, Nizhny Novgorod, Krasnoyarsk, Chelyabinsk, Samara, Ufa, Rostov-on-Don, Vladivostok, Omsk, Perm

Turkey:
Istanbul, Ankara, Izmir, Bursa, Antalya, Adana, Konya, Gaziantep, Mersin, Kayseri, Eskisehir, Diyarbakir

Georgia:
Tbilisi, Batumi, Kutaisi, Rustavi

Armenia:
Yerevan, Gyumri, Vanadzor, Vagharshapat

Azerbaijan:
Baku, Ganja, Sumqayit, Lankaran

Kazakhstan:
Almaty, Astana, Shymkent, Karaganda, Aktobe, Atyrau

Uzbekistan:
Tashkent, Samarkand, Namangan, Andijan, Bukhara, Nukus

Kyrgyzstan:
Bishkek, Osh, Jalal-Abad, Karakol

Tajikistan:
Dushanbe, Khujand, Kulob, Bokhtar

Turkmenistan:
Ashgabat, Turkmenabat, Dashoguz, Mary

Mongolia:
Ulaanbaatar, Erdenet, Darkhan, Choibalsan

China:
Shanghai, Beijing, Shenzhen, Guangzhou, Chengdu, Hangzhou, Hong Kong, Nanjing, Wuhan, Chongqing, Suzhou, Tianjin, Xi'an, Qingdao, Ningbo, Xiamen, Foshan, Dongguan, Changsha, Zhengzhou, Jinan, Dalian, Kunming, Hefei, Harbin, Nanchang, Wuxi

Japan:
Tokyo, Osaka, Nagoya, Yokohama, Fukuoka, Sapporo, Kyoto, Kobe, Hiroshima, Sendai, Saitama, Chiba

South Korea:
Seoul, Busan, Incheon, Daegu, Daejeon, Gwangju, Ulsan, Suwon, Seongnam, Jeju City

Taiwan:
Taipei, New Taipei, Taichung, Kaohsiung, Tainan, Hsinchu, Keelung

Hong Kong:
Hong Kong

Macau:
Macau

India:
Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, Gurugram, Noida, Chandigarh, Jaipur, Kochi, Coimbatore, Indore, Lucknow, Surat, Nagpur, Vadodara, Thiruvananthapuram, Bhubaneswar, Visakhapatnam, Patna, Bhopal, Kanpur, Agra, Nashik, Rajkot, Mysuru, Vijayawada, Ranchi, Guwahati, Dehradun, Amritsar, Varanasi, Thane, Aurangabad, Mangaluru, Navi Mumbai

Pakistan:
Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Multan, Quetta, Sialkot, Gujranwala

Bangladesh:
Dhaka, Chattogram, Khulna, Rajshahi, Sylhet, Rangpur, Mymensingh, Comilla

Nepal:
Kathmandu, Pokhara, Lalitpur, Biratnagar, Birgunj, Bharatpur

Sri Lanka:
Colombo, Kandy, Galle, Jaffna, Negombo, Kurunegala

Bhutan:
Thimphu, Phuntsholing, Paro

Maldives:
Male, Addu City, Fuvahmulah

Afghanistan:
Kabul, Herat, Kandahar, Mazar-i-Sharif, Jalalabad

Iran:
Tehran, Mashhad, Isfahan, Shiraz, Tabriz, Karaj, Ahvaz, Qom

Iraq:
Baghdad, Basra, Erbil, Mosul, Najaf, Karbala, Sulaymaniyah

Israel:
Tel Aviv, Jerusalem, Haifa, Rishon LeZion, Petah Tikva, Ashdod, Beersheba

Jordan:
Amman, Zarqa, Irbid, Aqaba, Salt

Lebanon:
Beirut, Tripoli, Sidon, Tyre, Zahle

Saudi Arabia:
Riyadh, Jeddah, Dammam, Mecca, Medina, Khobar, Dhahran, Abha

United Arab Emirates:
Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, Ras Al Khaimah, Fujairah

Qatar:
Doha, Al Rayyan, Al Wakrah, Umm Salal

Kuwait:
Kuwait City, Hawalli, Salmiya, Farwaniya

Bahrain:
Manama, Riffa, Muharraq, Hamad Town

Oman:
Muscat, Salalah, Sohar, Nizwa, Sur

Yemen:
Sanaa, Aden, Taiz, Hodeidah, Ibb

Egypt:
Cairo, Alexandria, Giza, Port Said, Suez, Mansoura, Luxor, Aswan

Morocco:
Casablanca, Rabat, Marrakesh, Tangier, Agadir, Fez, Meknes, Oujda

Algeria:
Algiers, Oran, Constantine, Annaba, Blida, Setif

Tunisia:
Tunis, Sfax, Sousse, Bizerte, Gabes

Libya:
Tripoli, Benghazi, Misrata, Sabha

Sudan:
Khartoum, Omdurman, Port Sudan, Kassala

Ethiopia:
Addis Ababa, Dire Dawa, Mekelle, Gondar, Hawassa, Bahir Dar

Kenya:
Nairobi, Mombasa, Kisumu, Nakuru, Eldoret

Tanzania:
Dar es Salaam, Dodoma, Arusha, Mwanza, Mbeya, Zanzibar City

Uganda:
Kampala, Entebbe, Jinja, Mbarara, Gulu

Rwanda:
Kigali, Butare, Gisenyi, Ruhengeri

Ghana:
Accra, Kumasi, Takoradi, Tamale, Tema

Nigeria:
Lagos, Abuja, Port Harcourt, Ibadan, Kano, Benin City, Enugu, Kaduna

South Africa:
Johannesburg, Cape Town, Pretoria, Durban, Gqeberha, Bloemfontein, East London

Zimbabwe:
Harare, Bulawayo, Mutare, Gweru

Zambia:
Lusaka, Kitwe, Ndola, Livingstone

Malawi:
Lilongwe, Blantyre, Mzuzu, Zomba

Mozambique:
Maputo, Matola, Beira, Nampula, Nacala

Namibia:
Windhoek, Walvis Bay, Swakopmund, Oshakati

Botswana:
Gaborone, Francistown, Maun, Molepolole

Angola:
Luanda, Huambo, Lobito, Benguela

Mauritius:
Port Louis, Beau Bassin-Rose Hill, Vacoas-Phoenix, Curepipe

Seychelles:
Victoria

Madagascar:
Antananarivo, Toamasina, Antsirabe, Mahajanga

Senegal:
Dakar, Touba, Thies, Saint-Louis

Cote d'Ivoire:
Abidjan, Yamoussoukro, Bouake, San-Pedro

Cameroon:
Douala, Yaounde, Bamenda, Bafoussam, Garoua

Democratic Republic of the Congo:
Kinshasa, Lubumbashi, Mbuji-Mayi, Kisangani, Goma

Republic of the Congo:
Brazzaville, Pointe-Noire, Dolisie

Gabon:
Libreville, Port-Gentil, Franceville

Burkina Faso:
Ouagadougou, Bobo-Dioulasso, Koudougou

Mali:
Bamako, Sikasso, Mopti, Segou

Niger:
Niamey, Zinder, Maradi, Agadez

Guinea:
Conakry, Nzerekore, Kankan, Kindia

Sierra Leone:
Freetown, Bo, Kenema, Makeni

Liberia:
Monrovia, Gbarnga, Buchanan

Togo:
Lome, Sokode, Kara

Benin:
Cotonou, Porto-Novo, Parakou, Abomey-Calavi

Somalia:
Mogadishu, Hargeisa, Kismayo, Bosaso

Australia:
Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Gold Coast, Newcastle, Wollongong, Hobart, Geelong, Darwin, Cairns

New Zealand:
Auckland, Wellington, Christchurch, Hamilton, Tauranga, Dunedin, Palmerston North

Indonesia:
Jakarta, Surabaya, Bandung, Medan, Semarang, Makassar, Palembang, Tangerang, Depok, Bekasi, Denpasar, Batam

Malaysia:
Kuala Lumpur, George Town, Johor Bahru, Ipoh, Kota Kinabalu, Malacca City, Kuching, Shah Alam, Petaling Jaya

Singapore:
Singapore

Philippines:
Manila, Quezon City, Cebu City, Davao City, Taguig, Pasig, Makati, Iloilo City, Cagayan de Oro, Baguio

Thailand:
Bangkok, Chiang Mai, Phuket, Pattaya, Chonburi, Khon Kaen, Hat Yai, Nakhon Ratchasima

Vietnam:
Ho Chi Minh City, Hanoi, Da Nang, Hai Phong, Can Tho, Nha Trang, Bien Hoa, Hue

Cambodia:
Phnom Penh, Siem Reap, Battambang, Sihanoukville

Laos:
Vientiane, Pakse, Savannakhet, Luang Prabang

Myanmar:
Yangon, Mandalay, Naypyidaw, Mawlamyine

Brunei:
Bandar Seri Begawan, Kuala Belait, Seria

Timor-Leste:
Dili, Baucau, Maliana

Papua New Guinea:
Port Moresby, Lae, Mount Hagen

Fiji:
Suva, Nadi, Lautoka

Samoa:
Apia, Vaitele

Tonga:
Nuku'alofa, Neiafu

Solomon Islands:
Honiara, Gizo

Vanuatu:
Port Vila, Luganville

Liechtenstein:
Vaduz

Andorra:
Andorra la Vella

Monaco:
Monaco
"""

import uuid

lines = data.strip().split("\n")
cities = []
country = None

for line in lines:
    line = line.strip()
    if not line:
        continue
    if line.endswith(":"):
        country = line[:-1]
    else:
        parts = [p.strip() for p in line.split(",")]
        for p in parts:
            if p:
                cities.append({"city": p, "country": country})

print(f"Total cities: {len(cities)}")

# Save to a json to inspect
with open("temp_cities.json", "w") as f:
    json.dump(cities, f)

