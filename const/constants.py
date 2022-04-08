import spectra
tables = {
    0: "scores_vn",
    1: "scores_vn",
    2: "scores_vn",
    3: "scores_vn",
    4: "scores_rx",
    5: "scores_rx",
    6: "scores_rx",
    7: "scores_ap"
}
mode_gulag_rev = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 0,
    5: 1,
    6: 2,
    7: 0
}

def mode_to_gulag(mode:int, mods:str):
    mods = mods.lower()
    if mods not in ["vn", "rx", "ap"]:
        raise ValueError('Invalid mods')
    if mode not in range(0, 4):
        raise ValueError('Invalid mode')

    if mods == "vn":
        return mode
    elif mods == "rx" and mode == 3:
        raise ValueError('Cannot use rx with mania')
    elif mods == "rx":
        mode += 4
        return mode
    elif mods == "ap" and mode != 0:
        raise ValueError('Cannot use ap with modes other than std')
    elif mods == "ap":
        mode = 7
        return mode

grade_colors= {
    "F": "#ff5959",
    "D": "#ff5959",
    "C": "#ff56da",
    "B": "#3d97ff",
    "A": "#2bff35",
    "S": "#ffcc22",
    "SH": "#cde7e7",
    "X": "#ffcc22",
    "XH": "#cde7e7",
}

grade_coverter = {
    "F":  "F",
    "D":  "D",
    "C":  "C",
    "B":  "B",
    "A":  "A",
    "S":  "S",
    "SH": "S",
    "X":  "SS",
    "XH": "SS",
}

diffColors = spectra.scale([ spectra.html(x).to("lab") for x in (['#4290FB', '#4FC0FF', '#4FFFD5', '#7CFF4F', '#F6F05C', '#FF8068', '#FF4E6F', '#C645B8', '#6563DE', '#18158E', '#000000']) ])
diffColorsDomain = diffColors.domain([0.1, 1.25, 2, 2.5, 3.3, 4.2, 4.9, 5.8, 6.7, 7.7, 9])