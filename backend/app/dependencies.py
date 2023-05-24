from fastapi import Request


def parse_prefix(req: Request):
    if "prefix" not in req.query_params:
        return None
    else:
        return req.query_params.get("prefix")