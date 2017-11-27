﻿
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AspergillosisEPR.Data;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace AspergillosisEPR.Controllers
{
    public class PartialsController : Controller
    {
        private readonly AspergillosisContext _context;

        public PartialsController(AspergillosisContext context)
        {

            _context = context;
        }

        public IActionResult DiagnosisForm()
        {
            PopulateDiagnosisCategoriesDropDownList();
            PopulateDiagnosisTypeDropDownList();
            return PartialView();
        }

        public IActionResult DrugForm()
        {
            PopulateDrugsDropDownList();
            PopulateSideEffectsDropDownList();
            return PartialView();
        }

        public IActionResult EditDiagnosisForm()
        {
            PopulateDiagnosisCategoriesDropDownList();
            PopulateDiagnosisTypeDropDownList();
            ViewBag.Index = (string)Request.Query["index"];
            return PartialView();
        }

        public IActionResult EditDrugForm()
        {
            PopulateDrugsDropDownList();
            PopulateSideEffectsDropDownList();
            ViewBag.Index = (string)Request.Query["index"];
            return PartialView();
        }

        private void PopulateDiagnosisCategoriesDropDownList(object selectedCategory = null)
        {
            var categoriesQuery = from d in _context.DiagnosisCategories
                                  orderby d.CategoryName
                                  select d;
            ViewBag.DiagnosisCategoryId = new SelectList(categoriesQuery.AsNoTracking(), "ID", "CategoryName", selectedCategory);
        }

        private void PopulateDiagnosisTypeDropDownList(object selectedDiagnosis = null)
        {
            var diagnosisTypesQuery = from d in _context.DiagnosisTypes
                                      orderby d.Name
                                      select d;
            ViewBag.DiagnosisTypeId = new SelectList(diagnosisTypesQuery.AsNoTracking(), "ID", "Name", selectedDiagnosis);
        }

        private void PopulateDrugsDropDownList(object selectedDrug = null)
        {
            var drugsQuery = from d in _context.Drugs
                                      orderby d.Name
                                      select d;
            ViewBag.DrugId = new SelectList(drugsQuery.AsNoTracking(), "ID", "Name", selectedDrug);
        }

        private void PopulateSideEffectsDropDownList(object selectedIds = null)
        {
            var sideEffects = from se in _context.SideEffects
                              orderby se.Name
                              select se;
            ViewBag.SideEffects = new MultiSelectList(sideEffects, "ID", "Name");
        }
    }


}