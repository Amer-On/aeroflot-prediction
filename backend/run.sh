#!/bin/bash
if [[ "$0" = "$BASH_SOURCE" ]]; then
    echo "Needs to be run using source: . run.sh"

else
    VENVPATH="venv/bin/activate"
    if [[ $# -eq 1 ]]; then 
        if [ -d $1 ]; then
            VENVPATH="$1/bin/activate"
        else
            echo "Virtual environment $1 not found"
            return
        fi

    elif [ -d "venv" ]; then 
        VENVPATH="venv/bin/activate"

    elif [-d "env"]; then 
        VENVPATH="env/bin/activate"
    fi

    echo "Activating virtual environment $VENVPATH"
    source "$VENVPATH"
    nohup python3  __main__.py &
fi
